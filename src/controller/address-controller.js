import addresService from "../service/addres-service";

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

export default {
    create,
}