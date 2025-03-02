import {FastifyInstance} from "fastify";

export default function userRoutes(fastify: FastifyInstance) {
    fastify.get('/me', {
        preHandler: [fastify.authenticate],
        handler: (request, reply) => {
            reply.send('ciao')
        }
    })
}
