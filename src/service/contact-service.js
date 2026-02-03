import { validate } from "../validation/validation.js";
import { createContactValidation } from "../validation/contact_validation.js";
import { getContactValidation } from "../validation/contact_validation.js";
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

export default {
    create, get
}