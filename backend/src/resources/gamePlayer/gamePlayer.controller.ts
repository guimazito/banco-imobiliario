import { Request, Response } from "express";
import { gamePlayerError } from "./gamePlayer.errors";
import { StatusCodes } from "http-status-codes";
import {
  createGamePlayer,
  getAllGamePlayers,
  getGamePlayerById,
  getGamePlayerByGameId,
  getGamePlayerByPlayerId,
  updateGamePlayer,
  getGamePlayerRankingByGameId,
} from "./gamePlayer.service";

const index = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'List all game players'
    #swagger.responses[200] = {
        description: 'List of game players',
        schema: { $ref: '#/definitions/GamePlayer' }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: '#/definitions/Error' }
    }
    */
  try {
    const gamePlayers = await getAllGamePlayers();
    res.status(StatusCodes.OK).json(gamePlayers);
  } catch (err) {
    gamePlayerError(res, err);
  }
};

const create = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Create a new game player'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CreateGamePlayerDto' }
    }
    #swagger.responses[201] = {
        description: 'Game player created successfully',
        schema: { $ref: '#/definitions/GamePlayer' }
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
    const gamePlayer = await createGamePlayer(req.body);
    res.status(StatusCodes.CREATED).json(gamePlayer);
  } catch (err) {
    gamePlayerError(res, err);
  }
};

const update = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Update a game player by ID'
    #swagger.parameters['gameId'] = {
        in: 'path',
        description: 'Game ID',
        required: true,
        type: 'string'
    }
    #swagger.parameters['playerId'] = {
        in: 'path',
        description: 'Player ID',
        required: true,
        type: 'string'
    }
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/UpdateGamePlayerDto' }
    }
    #swagger.responses[200] = {
        description: 'Game player updated successfully',
        schema: { $ref: '#/definitions/GamePlayer' }
    }
    #swagger.responses[400] = {
        description: 'Bad Request',
        schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[404] = {
        description: 'Game Player Not Found',
        schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: '#/definitions/Error' }
    }
    */
  try {
    const { gameId, playerId } = req.params;
    const gamePlayer = await updateGamePlayer(gameId, playerId, req.body);
    res.status(StatusCodes.OK).json(gamePlayer);
  } catch (err) {
    gamePlayerError(res, err);
  }
};

const listGamePlayerByGameId = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Get a game player by Game ID'
    #swagger.parameters['gameId'] = {
        in: 'path',
        description: 'Game ID',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
        description: 'Game player retrieved successfully',
        schema: { $ref: '#/definitions/GamePlayer' }
    }
    #swagger.responses[404] = {
        description: 'Game Player Not Found',
        schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: '#/definitions/Error' }
    }
    */
  try {
    const { gameId } = req.params;
    const gamePlayer = await getGamePlayerByGameId(gameId);
    res.status(StatusCodes.OK).json(gamePlayer);
  } catch (err) {
    gamePlayerError(res, err);
  }
};

const listGamePlayerByPlayerId = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Get a game player by Player ID'
    #swagger.parameters['playerId'] = {
        in: 'path',
        description: 'Player ID',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
        description: 'Game player retrieved successfully',
        schema: { $ref: '#/definitions/GamePlayer' }
    }
    #swagger.responses[404] = {
        description: 'Game Player Not Found',
        schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: '#/definitions/Error' }
    }
    */
  try {
    const { playerId } = req.params;
    const gamePlayer = await getGamePlayerByPlayerId(playerId);
    res.status(StatusCodes.OK).json(gamePlayer);
  } catch (err) {
    gamePlayerError(res, err);
  }
};

const listGamePlayerById = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Get a game player by Game ID and Player ID'
    #swagger.parameters['gameId'] = {
        in: 'path',
        description: 'Game ID',
        required: true,
        type: 'string'
    }
    #swagger.parameters['playerId'] = {
        in: 'path',
        description: 'Player ID',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
        description: 'Game player retrieved successfully',
        schema: { $ref: '#/definitions/GamePlayer' }
    }
    #swagger.responses[404] = {
        description: 'Game Player Not Found',
        schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: '#/definitions/Error' }
    }
    */
  try {
    const { gameId, playerId } = req.params;
    const gamePlayer = await getGamePlayerById(gameId, playerId);
    res.status(StatusCodes.OK).json(gamePlayer);
  } catch (err) {
    gamePlayerError(res, err);
  }
};

const listGamePlayerRankingByGameId = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Get a game player ranking by Game ID'
    #swagger.parameters['gameId'] = {
        in: 'path',
        description: 'Game ID',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
        description: 'Game player retrieved successfully',
        schema: { $ref: '#/definitions/GamePlayer' }
    }
    #swagger.responses[404] = {
        description: 'Game Player Not Found',
        schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: '#/definitions/Error' }
    }
    */
  try {
    const { gameId } = req.params;
    const ranking = await getGamePlayerRankingByGameId(gameId);
    res.status(StatusCodes.OK).json(ranking);
  } catch (err) {
    gamePlayerError(res, err);
  }
};

export default {
  index,
  create,
  update,
  listGamePlayerById,
  listGamePlayerByGameId,
  listGamePlayerByPlayerId,
  listGamePlayerRankingByGameId,
};
