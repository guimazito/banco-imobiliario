import Joi from "joi";

export const playerProfileSchema = Joi.object({
  profileName: Joi.string().min(3).max(50).required(),
});

export const playerProfileIdSchema = Joi.object({
  id: Joi.string().min(3).max(50).required(),
});

export const createPlayerProfileSchema = Joi.object({
  profileName: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(255).optional(),
});

export const updatePlayerProfileSchema = Joi.object({
  profileName: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(255).optional(),
});
