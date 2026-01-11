import { Request, Response } from "express";
import { playerError } from "./player.errors";
import { StatusCodes } from "http-status-codes";
import {
    createPlayer,
    getAllPlayers,
    updatePlayer,
    getPlayerByUsername,
} from "./player.service";

const index = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'List all players'
    #swagger.responses[200] = {
        description: 'List of players',
        schema: { $ref: '#/definitions/Player' }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: '#/definitions/Error' }
    }
    */
    try {
        const players = await getAllPlayers();
        res.status(StatusCodes.OK).json(players);
    } catch (err) {
        playerError(res, err);
    }
};

const create = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Create a new player'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CreatePlayerDto' }
    }
    #swagger.responses[201] = {
        description: 'Player created successfully',
        schema: { $ref: '#/definitions/Player' }
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
        const player = await createPlayer(req.body);
        res.status(StatusCodes.CREATED).json(player);
    } catch (err) {
        playerError(res, err);
    }
};

const update = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Update a player by ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Player ID',
        required: true,
        type: 'string'
    }
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/UpdatePlayerDto' }
    }
    #swagger.responses[200] = {
        description: 'Player updated successfully',
        schema: { $ref: '#/definitions/Player' }
    }
    #swagger.responses[400] = {
        description: 'Bad Request',
        schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[404] = {
        description: 'Player not found',
        schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: '#/definitions/Error' }
    }
    */
    try {
        const { id } = req.params;
        const player = await updatePlayer(id, req.body);
        res.status(StatusCodes.OK).json(player);
    } catch (err) {
        playerError(res, err);
    }
};

const listPlayerByUsername = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Get a player by username'
    #swagger.parameters['username'] = {
        in: 'path',
        description: 'Player Username',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
        description: 'Player retrieved successfully',
        schema: { $ref: '#/definitions/Player' }
    }
    #swagger.responses[404] = {
        description: 'Player not found',
        schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: '#/definitions/Error' }
    }
    */
    try {
        const { username } = req.params;
        const player = await getPlayerByUsername(username);
        res.status(StatusCodes.OK).json(player);
    } catch (err) {
        playerError(res, err);
    }
};

export default {
    index,
    create,
    update,
    listPlayerByUsername
}