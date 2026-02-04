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


export const createTestContact = async () => {
    await prismaClient.contacts.create({
        data: {
            first_name: 'contact',
            last_name: 'test',
            email: 'contact@test.com',
            phone: '081234567890',
            user: {
                connect: {
                    username: 'test'
                }
            }
        }
    })
}

export const createManyTestContact = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.contacts.create({
            data: {
                first_name: `test ${i}`,
                last_name: `test ${i}`,
                email: `contact${i}@test.com`,
                phone: `08123456789${i}`,
                user: {
                    connect: {
                        username: 'test'
                    }
                }
            }
        })
    }
}

export const getTestContact = async () => {
    return prismaClient.contacts.findFirst({
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

