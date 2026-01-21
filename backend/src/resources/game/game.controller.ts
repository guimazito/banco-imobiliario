import { Request, Response } from "express";
import { gameError } from "./game.errors";
import { StatusCodes } from "http-status-codes";
import {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  getGameByInvite
} from "./game.service";

const index = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'List all games'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'List of games',
        schema: { $ref: '#/definitions/Game' }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: '#/definitions/Error' }
    }
    */
  try {
    const games = await getAllGames();
    res.status(StatusCodes.OK).json(games);
  } catch (err) {
    gameError(res, err);
  }
};

const listGameById = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Get a game by ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Game ID',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
        description: 'Game retrieved successfully',
        schema: { $ref: '#/definitions/Game' }
    }
    #swagger.responses[404] = {
        description: 'Game Not Found',
        schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: '#/definitions/Error' }
    }
    */
  try {
    const id = await getGameById(req.params.id);
    res.status(StatusCodes.OK).json(id);
  } catch (err) {
    gameError(res, err);
  }
};

const listGameByInvite = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Get a game by Invite Code'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['invite'] = {
        in: 'path',
        description: 'Game Invite Code',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
        description: 'Game retrieved successfully',
        schema: { $ref: '#/definitions/Game' }
    }
    #swagger.responses[404] = {
        description: 'Game Not Found',
        schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: '#/definitions/Error' }
    }
    */
  try {
    const invite = await getGameByInvite(req.params.invite);
    res.status(StatusCodes.OK).json(invite);
  } catch (err) {
    gameError(res, err);
  }
};

const create = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Create a new game'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CreateGameDto' }
    }
    #swagger.responses[201] = {
        description: 'Game created successfully',
        schema: { $ref: '#/definitions/Game' }
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
    const game = await createGame(req.body);
    res.status(StatusCodes.CREATED).json(game);
  } catch (err) {
    gameError(res, err);
  }
};

const update = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Update an existing game'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Game ID',
        required: true,
        type: 'string'
    }
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/UpdateGameDto' }
    }
    #swagger.responses[200] = {
        description: 'Game updated successfully',
        schema: { $ref: '#/definitions/Game' }
    }
    #swagger.responses[400] = {
        description: 'Bad Request',
        schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[404] = {
        description: 'Game Not Found',
        schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: '#/definitions/Error' }
    }
    */
  try {
    const game = await updateGame(req.params.id, req.body);
    res.status(StatusCodes.OK).json(game);
  } catch (err) {
    gameError(res, err);
  }
};

export default {
    index,
    create,
    update,
    listGameById,
    listGameByInvite
};
