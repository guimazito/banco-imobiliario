import Joi from "joi";
import { PlayerStatus, PlayerIcon } from "@prisma/client"

export const playerIdSchema = Joi.object({
    id: Joi.string().uuid().required(),
});

export const playerNameSchema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
});

export const createPlayerSchema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    email: Joi.string().min(3).max(50).required(),
    // password: Joi.string().min(6).max(255),
    money: Joi.string().required(),
    status: Joi.string().valid(...Object.values(PlayerStatus)).required(),
    icon: Joi.string().valid(...Object.values(PlayerIcon)).required(),
});

export const updatePlayerSchema = Joi.object({
    money: Joi.number().optional(),
    status: Joi.string().valid(...Object.values(PlayerStatus)).optional(),
});