import Joi from 'joi';

export const forgotPasswordSchema = Joi.object({
    username: Joi.string().max(255).required(),
});

export const resetPasswordSchema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(6).max(255).required(),
});

export const loginSchema = Joi.object({
    username: Joi.string().max(255).required(),
    password: Joi.string().required(),
});

export const signUpSchema = Joi.object({
    username: Joi.string().max(255).required(),
    password: Joi.string().min(6).max(255).required(),
});