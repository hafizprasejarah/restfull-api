import { registerUserValidation } from "../validation/user_validation.js";
import { loginUserValidation } from "../validation/user_validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';


const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if (countUser > 0) {
        throw new ResponseError(400, "Username already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return await prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true
        }
    });

}


const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findFirst({
        where: {
            username: loginRequest.username
        },
        select: {
            id: true,
            username: true,
            password: true
        }
    })

    if (!user) {
        throw new ResponseError(401, "Username or password is incorrect");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password is incorrect");
    }

    const token = uuid().toString()

    return prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            id: user.id
        },
        select: {
            token: true
        }
    });
}

export default { register, login };