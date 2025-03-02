import {FastifyInstance} from "fastify";
import authSchema from "../schemas/auth.schema";
import authController from "../controllers/auth.controller";

export default function authRoutes(fastify: FastifyInstance) {
    fastify.post('/signup', {
        schema: authSchema.signup,
        handler: authController.signup
    })

    fastify.post('/login', {
        schema: authSchema.login,
        handler: authController.login
    })
}
