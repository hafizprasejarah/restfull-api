import { validate } from "uuid";
import { prismaClient } from "../application/database"
import { ResponseError } from "../error/response-error";
import { getContactValidation } from "../validation/contact_validation";
import { createAddresValidation } from "../validation/address_validation";

const create = async (user, contactId, request) => {
    contactId = validate(getContactValidation, contactId);

    const totalContactInDatabase = await prismaClient.contacts.count({
        where: {
            user: {
                username: user.username
            },
            id: contactId
        }
    });


    if (!totalContactInDatabase) {
        throw new ResponseError(404, "contact is not found");
    }

    const address = validate(createAddresValidation, request);
    address.contactId = contactId;

    return prismaClient.address.create({
        data: address,
        select:{
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    });
}

export default {
    create
}