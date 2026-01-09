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

export const getGamePlayerByGameId = async (
    gameId: string
): Promise<GamePlayer[]> => {
    return await prisma.gamePlayer.findMany({
        where: { gameId },
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