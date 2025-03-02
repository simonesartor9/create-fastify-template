import Fastify, {FastifyBaseLogger} from "fastify";
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import 'dotenv/config'
import figlet from "figlet";
import authRoutes from "../routes/auth.route";
import jwtPlugin from '../plugins/jwt'
import userRoutes from "../routes/user.route";

const app = Fastify({
    logger: {
        level: process.env.LOG_LEVEL || 'debug',
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
                ignore: 'pid,hostname'
            }
        }
    }
});

const corsWhitelist: Array<string> = process.env.CORS_WHITELIST ? process.env.CORS_WHITELIST.split(',') : [];
app.register(cors, {
    origin: corsWhitelist,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
})

if (process.env.DEBUG === 'true') {
    app.register(swagger, {
        swagger: {
            info: {
                title: `${process.env.PROJECT_NAME} API`,
                description: `API documentation for ${process.env.PROJECT_NAME} project`,
                version: '1.0.0'
            },
            host: `localhost:${process.env.PORT}`,
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json']
        }
    })

    app.register(swaggerUi, {
        routePrefix: '/swagger-ui',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        transformSpecification: (swaggerObject, _request, _reply) => {
            return swaggerObject
        },
        transformSpecificationClone: true
    })
}

app.get('/', async (request, reply) => {
    return {message: 'Please read the documentation'};
});

app.ready(() => {
    console.log(figlet.textSync(`${process.env.PROJECT_NAME} API`, {horizontalLayout: 'full'}));
})

app.register(authRoutes, {prefix: '/auth-api'});

app.register(jwtPlugin)
app.register(userRoutes, {prefix: '/api'});

export const logger: FastifyBaseLogger = app.log;
export default app;
