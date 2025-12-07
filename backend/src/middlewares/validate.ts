import { Schema } from "joi";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false
        });
        if (error) res.status(StatusCodes.BAD_REQUEST).json({ error: error.details });
        else next();
    };
};