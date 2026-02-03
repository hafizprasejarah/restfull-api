import { prismaClient } from "../src/application/database";
import bcrypt from 'bcrypt';

const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: 'test'
        }
    });
}

const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: 'test',
            password: await bcrypt.hash('Rahasia', 10),
            name: 'test',
            token: 'test'
        }
    })
}

const getUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: 'test'
        }
    });
}

const removeAllTestContacts = async () => {
    await prismaClient.contacts.deleteMany({
        where: {
            user: {
                username: 'test'
            }
        }
    });
}

export {
    removeTestUser, createTestUser, getUser, removeAllTestContacts
}

