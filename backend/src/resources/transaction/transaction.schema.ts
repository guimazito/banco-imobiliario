import Joi from "joi";
import { TransactionType } from "@prisma/client"

export const transactionIdSchema = Joi.object({
    id: Joi.string().uuid().required(),
});

export const createTransactionSchema = Joi.object({
    amount: Joi.number().integer().required(),
    description: Joi.string().max(255).required(),
    type: Joi.string().valid(...Object.values(TransactionType)).required(),
    playerIdPay: Joi.string().uuid().required(),
    playerIdReceive: Joi.string().uuid().required(),
});