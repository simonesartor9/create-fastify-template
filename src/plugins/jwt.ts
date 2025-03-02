import jwt from '@fastify/jwt'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'
import {UnauthorizedException} from "../exceptions/unauthorized.exception";
import errorConstants from "../config/errorConstants";
import {logger} from "../config/apiConfig";

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(jwt, {
    secret: process.env.JWT_SECRET as string,
  })

  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      logger.warn(`request.jwtVerify() ${await request.jwtVerify()}`)
      await request.jwtVerify()
    } catch (err) {
      throw new UnauthorizedException(errorConstants.ACCESS_TOKEN_EXPIRED)
    }
  })
})

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => unknown
    payload: { id: string }
    user: { id: string }
  }
}
