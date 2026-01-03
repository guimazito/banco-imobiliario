import Joi from "joi";
import { PlayerStatus, PlayerIcon } from "@prisma/client"

export const gamePlayerIdSchema = Joi.object({
    gameId: Joi.string().uuid().required(),
    playerId: Joi.string().uuid().required(),
});

export const createGamePlayerSchema = Joi.object({
    gameId: Joi.string().uuid().required(),
    playerId: Joi.string().uuid().required(),
    playerMoney: Joi.number().valid(2500).required(),
    playerStatus: Joi.string().valid(...Object.values(PlayerStatus)).required(),
    playerIcon: Joi.string().valid(...Object.values(PlayerIcon)).required(),
});

export const updateGamePlayerSchema = Joi.object({
    playerMoney: Joi.number().valid(2500).optional,
    playerStatus: Joi.string().valid(...Object.values(PlayerStatus)).optional(),
    playerIcon: Joi.string().valid(...Object.values(PlayerIcon)).optional(),
});