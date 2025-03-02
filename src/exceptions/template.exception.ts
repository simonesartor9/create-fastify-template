import {FastifyError} from "fastify";
import status from "http-status";

export class TemplateException extends Error implements FastifyError {
    code: string;
    statusCode: number;

    constructor(exception: ITemplateException) {
        super(exception.message || 'Template Exception');
        this.name = 'TemplateException';
        this.code = exception.code || 'TEMPLATE_EXCEPTION';
        this.statusCode = exception.statusCode || status.INTERNAL_SERVER_ERROR;
    }
}

interface ITemplateException {
    code?: string;
    statusCode: number;
    message?: string;
}
