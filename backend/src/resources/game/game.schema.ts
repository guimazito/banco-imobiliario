import Joi from "joi";
import { GameStatus } from "@prisma/client"

export const gameIdSchema = Joi.object({
    id: Joi.string().uuid().required(),
});

export const createGameSchema = Joi.object({
    status: Joi.string().valid(...Object.values(GameStatus)).required(),
});

export const updateGameSchema = Joi.object({
    invite: Joi.string().max(9).optional(),
    status: Joi.string().valid(...Object.values(GameStatus)).optional(),
});