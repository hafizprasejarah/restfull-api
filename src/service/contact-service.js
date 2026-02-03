import { validate } from "../validation/validation.js";
import { createContactValidation } from "../validation/contact_validation.js";
import { prismaClient } from "../application/database.js";

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

export default {
    create
}