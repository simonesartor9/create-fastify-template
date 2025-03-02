import {FastifyError} from "fastify";
import status from "http-status";
import errorConstants from "../config/errorConstants";

class ForbiddenException extends Error implements FastifyError {
    readonly statusCode = status.FORBIDDEN;
    code: string;

    constructor(message: string, errorCode?: string) {
        super(message);
        this.name = 'TemplateException';
        this.code = errorCode || errorConstants.FORBIDDEN;
    }
}
