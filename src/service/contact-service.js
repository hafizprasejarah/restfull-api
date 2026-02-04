import { validate } from "../validation/validation.js";
import { createContactValidation } from "../validation/contact_validation.js";
import { getContactValidation } from "../validation/contact_validation.js";
import { updateContactValidation } from "../validation/contact_validation.js";
import { searchContactValidation } from "../validation/contact_validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (user, request) => {
    const contact = validate(createContactValidation, request);
    contact.userId = user.id;
    return prismaClient.contacts.create({
        data: contact,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })
}

const get = async (user, contactId) => {
    const id = validate(getContactValidation, contactId);

    const contact = await prismaClient.contacts.findFirst({
        where: {
            id: id,
            userId: user.id
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })

    if (!contact) {
        throw new ResponseError(404, "contact not found");
    }

    return contact;
}

const update = async (user, request) => {

    const contact = validate(updateContactValidation, request);

    const totalContactInDatabase = await prismaClient.contacts.count({
        where: {
            user: {
                username: user.username
            },
            id: contact.id
        }
    });

    if (totalContactInDatabase !== 1) {
        throw new ResponseError(404, "contact not found");
    }

    return prismaClient.contacts.update({
        where: {
            id: contact.id
        },
        data: {
            first_name: contact.first_name,
            last_name: contact.last_name,
            email: contact.email,
            phone: contact.phone
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })
}


const remove = async (user, contactId) => {
    const id = validate(getContactValidation, contactId);

    const contact = await prismaClient.contacts.count({
        where: {
            user: {
                username: user.username
            },
            id: id
        }
    })

    if (contact !== 1) {
        throw new ResponseError(404, "contact not found");
    }

    return prismaClient.contacts.delete({
        where: {
            id: id
        }
    })
}


const search = async (user, request) => {
    request = validate(searchContactValidation, request);

    //1 ((page - 1) * size) = 0
    //2 ((page - 1) * size) = 10
    const skip = (request.page - 1) * request.size;

    const filters = [];

    filters.push({
        user: {
            username: user.username
        }
    })

    if (request.name) {
        filters.push({
            OR: [
                {
                    first_name: {
                        contains: request.name,
                    }
                },
                {
                    last_name: {
                        contains: request.name,
                    }
                }
            ]
        });
    }

    if (request.email) {
        filters.push(
            {
                email: {
                    contains: request.email
                }
            },
        );
    }


    if (request.phone) {
        filters.push(
            {
                phone: {
                    contains: request.phone
                }
            }
        );
    }


    const contacts = await prismaClient.contacts.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip

    });

    const totalItem = await prismaClient.contacts.count({
        where: {
            AND: filters
        }
    });

    return {
        contacts: contacts,
        paging: {
            page: request.page,
            total_item: totalItem,
            total_page: Math.ceil(totalItem / request.size),
        }
    }
}

export default {
    create, get, update, remove, search
}