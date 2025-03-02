import {Sequelize} from "sequelize-typescript";
import User from "../models/user";
import Role from "../models/role";
import RolePermission from "../models/rolePermission";
import Permission from "../models/permission";
import {logger} from "../config/apiConfig";

const sequelize: Sequelize = new Sequelize({
    database: process.env.DB_NAME ?? "",
    dialect: process.env.DB_DIALECT as any,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST ?? "",
    pool: {
        max: 50,
        min: 0,
        idle: 10000
    },
    logging: process.env.DEBUG === 'true'
        ? (msg: string) => logger.debug(msg)
        : false,
    models: [__dirname + "/**/*.model.ts"],
});

sequelize.addModels([
    User,
    Role,
    RolePermission,
    Permission,
]);

export async function connectToDatabase(): Promise<Sequelize | undefined> {
    await sequelize.authenticate();
    const alter = process.env.ALTER_TABLE === "true";
    if (alter) {
        logger.debug('Alter tables process started');
        await sequelize.sync({force: false, alter: true})
        logger.debug('Alter tables process completed');
    }
    logger.info(`Connection to database has been established successfully.`);
    return sequelize;
}

export async function getSequelizeInstance(): Promise<Sequelize> {
    return sequelize;
}
