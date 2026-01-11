import crypto from "crypto";
import { PrismaClient, Game } from "@prisma/client";
import { CreateGameDto, UpdateGameDto } from "./game.types";

const prisma = new PrismaClient();

export const createGame = async (data: CreateGameDto): Promise<Game> => {
  const gameId = crypto.randomUUID();
  const newGame = await prisma.game.create({
    data: {
      ...data,
      id: gameId,
      invite: parseInt(gameId.replace(/-/g, "").slice(0, 12), 16).toString(36).toUpperCase(),
    },
  });
  return newGame;
};

export const getAllGames = async (): Promise<Game[]> => {
  return await prisma.game.findMany();
};

export const getGameByInvite = async (invite: string): Promise<Game | null> => {
  return await prisma.game.findUnique({
    where: { invite },
  });
};

export const getGameById = async (id: string): Promise<Game | null> => {
  return await prisma.game.findUnique({
    where: { id },
  });
};

export const updateGame = async (
  id: string,
  data: Partial<UpdateGameDto>
): Promise<Game> => {
  return await prisma.game.update({
    where: { id },
    data,
  });
};