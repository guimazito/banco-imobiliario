import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { playerProfileError } from "./playerProfile.errors";
import {
  CreatePlayerProfileDto,
  UpdatePlayerProfileDto,
} from "./playerProfile.types";
import {
  createPlayerProfile,
  getPlayerProfileById,
  getAllPlayerProfiles,
  updatePlayerProfile,
  deletePlayerProfile,
} from "./playerProfile.service";

const index = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'List all player profiles.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Player profiles retrieved successfully.',
        schema: { $ref: '#/definitions/PlayerProfile' }
    }
    #swagger.responses[500] = {
        description: 'Internal server error.',
        schema: { $ref: '#/definitions/Error' }
    }
    */
  try {
    const profiles = await getAllPlayerProfiles();
    res.status(StatusCodes.OK).json(profiles);
  } catch (error) {
    playerProfileError(res, error);
  }
};

const create = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Create new player profile.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CreatePlayerProfileDto' }
    }
    #swagger.responses[201] = {
        description: 'Player profile created successfully.',
        schema: { $ref: '#/definitions/PlayerProfile' }
    }
    #swagger.responses[400] = {
        description: 'Bad request.',
        schema: { $ref: '#/definitions/BadRequest' }
    }
    #swagger.responses[500] = {
        description: 'Internal server error.',
        schema: { $ref: '#/definitions/Error' }
    }
    */
  const profileData: CreatePlayerProfileDto = req.body;

  try {
    const newProfile = await createPlayerProfile(profileData);
    res.status(StatusCodes.CREATED).json(newProfile);
  } catch (error) {
    playerProfileError(res, error);
  }
};

const read = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Get player profile by ID.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
        description: 'Player profile retrieved successfully.',
        schema: { $ref: '#/definitions/PlayerProfile' }
    }
    #swagger.responses[404] = {
        description: 'Player profile not found.',
        schema: { $ref: '#/definitions/NotFound' }
    }
    #swagger.responses[500] = {
        description: 'Internal server error.',
        schema: { $ref: '#/definitions/Error' }
    }
    */
  const profileId = req.params.id;

  try {
    const profile = await getPlayerProfileById(profileId);
    res.status(StatusCodes.OK).json(profile);
  } catch (error) {
    playerProfileError(res, error);
  }
};

const update = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Update player profile by ID.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'string'
    }
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/UpdatePlayerProfileDto' }
    }
    #swagger.responses[200] = {
        description: 'Player profile updated successfully.',
        schema: { $ref: '#/definitions/PlayerProfile' }
    }
    #swagger.responses[400] = {
        description: 'Bad request.',
        schema: { $ref: '#/definitions/BadRequest' }
    }
    #swagger.responses[404] = {
        description: 'Player profile not found.',
        schema: { $ref: '#/definitions/NotFound' }
    }
    #swagger.responses[500] = {
        description: 'Internal server error.',
        schema: { $ref: '#/definitions/Error' }
    }
    */
  const profileId = req.params.id;
  const profileData: UpdatePlayerProfileDto = req.body;

  try {
    const updatedProfile = await updatePlayerProfile(profileId, profileData);
    res.status(StatusCodes.OK).json(updatedProfile);
  } catch (error) {
    playerProfileError(res, error);
  }
};

const remove = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Delete player profile by ID.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
        description: 'Player profile deleted successfully.',
        schema: { $ref: '#/definitions/PlayerProfile' }
    }
    #swagger.responses[404] = {
        description: 'Player profile not found.',
        schema: { $ref: '#/definitions/NotFound' }
    }
    #swagger.responses[500] = {
        description: 'Internal server error.',
        schema: { $ref: '#/definitions/Error' }
    }
    */
  const profileId = req.params.id;

  try {
    const deletedProfile = await deletePlayerProfile(profileId);
    res.status(StatusCodes.OK).json(deletedProfile);
  } catch (error) {
    playerProfileError(res, error);
  }
};

export default {
  index,
  create,
  read,
  update,
  remove,
};
