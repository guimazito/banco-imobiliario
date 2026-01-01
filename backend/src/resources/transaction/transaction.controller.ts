import { Request, Response } from "express";
import { transactionError } from "./transaction.errors";
import { StatusCodes } from "http-status-codes";
import {
  createTransaction,
  getTransactionById,
  getAllTransactions,
} from "./transaction.service";

const index = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'List all transactions'
    #swagger.responses[200] = {
        description: 'List of transactions',
        schema: { $ref: '#/definitions/Transaction' }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: '#/definitions/Error' }
    }
    */
  try {
    const transactions = await getAllTransactions();
    res.status(StatusCodes.OK).json(transactions);
  } catch (err) {
    transactionError(res, err);
  }
};

const create = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Create a new transaction'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CreateTransactionDto' }
    }
    #swagger.responses[201] = {
        description: 'Transaction created successfully',
        schema: { $ref: '#/definitions/Transaction' }
    }
    #swagger.responses[400] = {
        description: 'Bad Request',
        schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: '#/definitions/Error' }
    }
    */
  try {
    const transaction = await createTransaction(req.body);
    res.status(StatusCodes.CREATED).json(transaction);
  } catch (err) {
    transactionError(res, err);
  }
};

const listTransactionById = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Get a transaction by ID'
    #swagger.responses[200] = {
        description: 'Transaction retrieved successfully',
        schema: { $ref: '#/definitions/Transaction' }
    }
    #swagger.responses[404] = {
        description: 'Transaction not found',
        schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: '#/definitions/Error' }
    }
    */
  try {
    const id = await getTransactionById(req.params.id);
    res.status(StatusCodes.OK).json(id);
  } catch (err) {
    transactionError(res, err);
  }
};

export default {
  index,
  create,
  listTransactionById,
};
