import {Type} from "@sinclair/typebox";

export default {
    signup: {
        description: 'Create a new user',
        tags: ['Auth'],
        body: Type.Object({
            email: Type.String({format: 'email'}),
            password: Type.String(),
            name: Type.Optional(Type.String()),
            phone: Type.Optional(Type.String()),
        }),
        response: {
            200: Type.Object({
                success: Type.Boolean(),
                data: Type.Object({
                    user: Type.Object({
                        id: Type.String(),
                        name: Type.String(),
                        email: Type.String({format: 'email'}),
                        phone: Type.Optional(Type.String({format: 'phone'})),
                        status: Type.String(),
                        number: Type.Number(),
                        createdAt: Type.String({format: 'date-time'}),
                        updatedAt: Type.String({format: 'date-time'}),
                    }),
                    accessToken: Type.String(),
                    refreshToken: Type.String(),
                })
            }),
            409: Type.Object({
                success: Type.Boolean({default: false}),
                message: Type.String(),
                code: Type.String(),
                statusCode: Type.Number({default: 409}),
            })
        },
    },
    login: {
        description: 'Get a JWT Token',
        tags: ['Auth'],
        body: Type.Object({
            email: Type.String({format: 'email'}),
            password: Type.String(),
        }),
        response: {
            200: Type.Object({
                success: Type.Boolean(),
                data: Type.Object({
                    user: Type.Object({
                        id: Type.String(),
                        name: Type.String(),
                        email: Type.String({format: 'email'}),
                        phone: Type.Optional(Type.String({format: 'phone'})),
                        status: Type.String(),
                        number: Type.Number(),
                        createdAt: Type.String({format: 'date-time'}),
                        updatedAt: Type.String({format: 'date-time'}),
                    }),
                    accessToken: Type.String(),
                    refreshToken: Type.String(),
                })
            }),
            401: Type.Object({
                success: Type.Boolean({default: false}),
                message: Type.String(),
                code: Type.String(),
                statusCode: Type.Number({default: 401}),
            })
        },
    }
}
