import Joi from "joi";

export const playerIdSchema = Joi.object({
    id: Joi.string().uuid().required(),
});

export const playerUsernameSchema = Joi.object({
    username: Joi.string().min(1).max(100).required(),
});

export const createPlayerSchema = Joi.object({
    username: Joi.string().min(1).max(100).required(),
    profileId: Joi.string().uuid().required(),
});

export const updatePlayerSchema = Joi.object({
    username: Joi.string().min(1).max(100).required(),
    profileId: Joi.string().uuid().required(),
});