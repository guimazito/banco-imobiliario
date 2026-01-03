import {
    PrismaClient,
    GamePlayer
} from "@prisma/client";
import {
    CreateGamePlayerDto,
    UpdateGamePlayerDto
} from "./gamePlayer.types";

const prisma = new PrismaClient();

export const createGamePlayer = async (
    data: CreateGamePlayerDto
): Promise<GamePlayer> => {
    const newGamePlayer = await prisma.gamePlayer.create({
        data,
    });

    return newGamePlayer;
}

export const getAllGamePlayers = async (): Promise<GamePlayer[]> => {
    return await prisma.gamePlayer.findMany();
};

export const getGamePlayerById = async (
    gameId: string,
    playerId: string
): Promise<GamePlayer | null> => {
    return await prisma.gamePlayer.findUnique({
        where: { gameId_playerId: { gameId, playerId } },
    });
};

export const updateGamePlayer = async (
    gameId: string,
    playerId: string,
    data: Partial<UpdateGamePlayerDto>
): Promise<GamePlayer> => {
    return await prisma.gamePlayer.update({
        where: { gameId_playerId: { gameId, playerId } },
        data,
    });
};