import addresService from "../service/addres-service.js";

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const contactId = req.params.contactId;


        const result = await addresService.create(user, contactId, request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);

    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId;
        const addressId = req.params.addressId;

        const result = await addresService.get(user, contactId, addressId);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}


const update = async (req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId;
        const addressId = req.params.addressId;
        const request = req.body;
        request.id = addressId;

        const result = await addresService.update(user, contactId, request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);

    }
}


const remove = async (req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId;
        const addressId = req.params.addressId;

        await addresService.remove(user, contactId, addressId);
        res.status(200).json({
            data: 'ok'
        });
    } catch (e) {
        next(e);

    }
}

const list = async (req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId;

        const result = await addresService.list(user, contactId);
        res.status(200).json({
            data: result
        });

    } catch (e) {
        next(e);

    }
}
export default {
    create, get, update, remove, list
}