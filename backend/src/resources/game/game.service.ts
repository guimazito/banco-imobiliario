import { PrismaClient, Game } from "@prisma/client";
import { CreateGameDto, UpdateGameDto } from "./game.types";

const prisma = new PrismaClient();

export const createGame = async (data: CreateGameDto): Promise<Game> => {
  const newGame = await prisma.game.create({
    data,
  });

  return newGame;
};

export const getAllGames = async (): Promise<Game[]> => {
  return await prisma.game.findMany();
}

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
