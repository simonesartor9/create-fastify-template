import { FastifyError } from 'fastify';
import status from "http-status";

export class UnauthorizedException extends Error implements FastifyError {
    code: string;
    statusCode: number;

    constructor(message?: string) {
        super(message || 'Unauthorized');
        this.name = 'UnauthorizedException';
        this.code = 'UNAUTHORIZED';
        this.statusCode = status.UNAUTHORIZED;
    }
}
