import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database"
import { ResponseError } from "../error/response-error";
import { getContactValidation } from "../validation/contact_validation";
import { createAddresValidation, getAddressValidation } from "../validation/address_validation";

const checkContactMustExist = async (user, contactId) => {

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

    return contactId;
}

const create = async (user, contactId, request) => {
    contactId = await checkContactMustExist(user, contactId);

    const address = validate(createAddresValidation, request);
    address.contactId = contactId;

    return prismaClient.address.create({
        data: address,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    });
}

const get = async (user, contactId, addressId) => {
    contactId = await checkContactMustExist(user, contactId);
    addressId = validate(getAddressValidation, addressId);

    const addres = await prismaClient.address.findFirst({
        where: {
            contactId: contactId,
            id: addressId,

        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    });

    if (!addres) {
        throw new ResponseError(404, "address is not found");
    }

    return addres;
}

export default {
    create, get
}