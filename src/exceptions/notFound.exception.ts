import {FastifyError} from "fastify";
import status from "http-status";
import errorConstants from "../config/errorConstants";

export class NotFoundException extends Error implements FastifyError {
    readonly statusCode = status.NOT_FOUND;
    code: string;

    constructor(message: string, errorCode?: string) {
        super(message);
        this.name = 'NotFoundException';
        this.code = errorCode || errorConstants.NOT_FOUND;
    }
}
