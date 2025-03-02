import User from "../models/user";
import constants from "../config/constants";
import bcrypt from 'bcrypt'

const userService = {
    findByEmail,
    create,
    getNextNumber,
    comparePassword
}

async function findByEmail(email: string): Promise<User | null> {
    return await User.findOne({
        where: {
            email,
            status: constants.STATUS_ACTIVE
        }
    });
}

async function create(user: Partial<User>): Promise<User> {
    return await User.create(user);
}

async function update(user: Partial<User>): Promise<User> {
    await User.update(user, {
        where: {
            id: user.id
        }
    });

    return await getById(user.id);
}

async function getById(id: string): Promise<User | null> {
    return await User.findByPk(id);
}

async function getNextNumber(): Promise<number> {
    const userCount: number = await User.count({
        where: {
            status: constants.STATUS_ACTIVE
        }
    })
    return userCount + 1;
}

async function comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}

export default userService;
