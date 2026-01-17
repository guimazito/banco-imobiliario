import { PrismaClient, GamePlayer } from "@prisma/client";
import { CreateGamePlayerDto, UpdateGamePlayerDto } from "./gamePlayer.types";

const prisma = new PrismaClient();

export const createGamePlayer = async (
  data: CreateGamePlayerDto
): Promise<GamePlayer> => {
  const newGamePlayer = await prisma.gamePlayer.create({
    data,
  });

  return newGamePlayer;
};

export const getAllGamePlayers = async (): Promise<GamePlayer[]> => {
  return await prisma.gamePlayer.findMany();
};

export const getGamePlayerByGameId = async (
  gameId: string
): Promise<(GamePlayer & { player: { username: string } })[]> => {
  return await prisma.gamePlayer.findMany({
    where: { gameId },
    include: {
      player: {
        select: { username: true },
      },
    },
  });
};

export const getGamePlayerByPlayerId = async (
  playerId: string
): Promise<GamePlayer[]> => {
  return await prisma.gamePlayer.findMany({
    where: { playerId },
    orderBy: [
      {
        game: {
          createdAt: "desc",
        },
      },
    ],
    include: {
      game: {
        select: {
          invite: true,
          createdAt: true,
        },
      },
    },
  });
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

export const getGamePlayerRankingByGameId = async (
  gameId: string
): Promise<(GamePlayer & { player: { username: string } })[]> => {
  return await prisma.gamePlayer.findMany({
    where: { gameId },
    orderBy: [{ playerMoney: "desc" }],
    include: {
      player: {
        select: { username: true },
      },
    },
  });
};

export const getGamePlayerUsedAvatarByGameId = async (
  gameId: string
): Promise<string[]> => {
  const usedAvatars = await prisma.gamePlayer.findMany({
    where: { gameId },
    select: { playerIcon: true },
  });

  return usedAvatars.map((gp) => gp.playerIcon);
}
