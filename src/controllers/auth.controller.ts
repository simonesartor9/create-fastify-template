import {FastifyReply, FastifyRequest} from "fastify";
import userService from "../services/user.service";
import {TemplateException} from "../exceptions/template.exception";
import errorConstants from "../config/errorConstants";
import status from "http-status";
import utils from "../config/utils";
import {NotFoundException} from "../exceptions/notFound.exception";
import User from "../models/user";

const authController = {
    signup,
    login
}

async function signup(request: FastifyRequest, reply: FastifyReply) {
    const {name, email, password, phone} = request.body as {
        name: string;
        email: string;
        password: string,
        phone: string
    };

    const userAlreadyExists = await userService.findByEmail(email);
    if (userAlreadyExists) {
        throw new TemplateException({
            message: 'User already exists',
            code: errorConstants.USER_ALREADY_EXISTS,
            statusCode: status.CONFLICT
        })
    }

    const user = await userService.create({
        name,
        email,
        password,
        phone,
        recoveryNumber: utils.randomPassword(),
        recoveryNumberDate: new Date(),
        number: await userService.getNextNumber()
    });

    utils.success(reply, generateAuthResponse(request, user));
}

async function login(request: FastifyRequest, reply: FastifyReply) {
    const {email, password} = request.body as {
        email: string;
        password: string;
    }

    const user = await userService.findByEmail(email);
    if (!user) {
        throw new NotFoundException(errorConstants.USER_NOT_FOUND)
    }

    if (!await userService.comparePassword(password, user.password)) {
        throw new TemplateException({
            message: 'Invalid password',
            code: errorConstants.INVALID_PASSWORD,
            statusCode: status.UNAUTHORIZED
        })
    }

    utils.success(reply, generateAuthResponse(request, user));
}

function generateAuthResponse(request: FastifyRequest, user: User) {
    const jwtPayload = {
        email: user.email,
        id: user.id
    }
    const refreshToken: string = request.server.jwt.sign(jwtPayload, {expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION || '7d'});
    const accessToken: string = request.server.jwt.sign(jwtPayload, {expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION || '1d'});
    return {
        user,
        accessToken,
        refreshToken
    }
}

export default authController;
