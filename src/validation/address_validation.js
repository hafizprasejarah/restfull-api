
import Joi from 'joi';

const createAddresValidation = Joi.object({
    street : Joi.string().max(100).required(),
    city: Joi.string().max(100).required(),
    province: Joi.string().max(100).required(),
    postal_code: Joi.number().max(100).required()
});