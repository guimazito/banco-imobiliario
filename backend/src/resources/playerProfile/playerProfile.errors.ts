import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const playerProfileError = (res: Response, err: any) => {
  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: ReasonPhrases.BAD_REQUEST,
      message: err.message,
    });
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: ReasonPhrases.BAD_REQUEST,
      message: err.message,
    });
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: ReasonPhrases.BAD_REQUEST,
      message: err.message,
    });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message: err.message || err.toString(),
    });
  }
};