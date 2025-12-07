import Joi from "joi";

export const playerIdSchema = Joi.object({
    id: Joi.string().uuid().required(),
});

export const createPlayerSchema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    money: Joi.string().required(),
    status: Joi.string().required(),
    icon: Joi.string().required(),
});