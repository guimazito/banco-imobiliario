import { PrismaClient, Player } from "@prisma/client";
import { genSalt, hash } from "bcryptjs";
import { CreatePlayerDto, UpdatePlayerDto } from "./player.types";

const prisma = new PrismaClient();

export const createPlayer = async (data: CreatePlayerDto): Promise<Player> => {
  const defaultPassword = "banco123";
  const passwordToUse =
    data.password && data.password.trim() !== ""
      ? data.password
      : defaultPassword;
  const rounds = parseInt(process.env.ROUNDS_BCRYPT ?? "10");
  const salt = await genSalt(rounds);
  const hashedPassword = await hash(passwordToUse, salt);

  const newPlayer = await prisma.player.create({
    data: {
      ...data,
      password: hashedPassword
    },
  });

  return newPlayer;
};

export const getPlayerById = async (id: string): Promise<Player | null> => {
  return await prisma.player.findUnique({
    where: { id },
  });
};

export const getPlayerByUsername = async (username: string): Promise<Player | null> => {
  return await prisma.player.findFirst({
    where: { username },
  });
};

// export const getPlayerRanking = async (): Promise<Player[]> => {
//   return await prisma.player.findMany({
//     orderBy: {
//       money: "desc",
//     },
//   });
// };

export const getAllPlayers = async (): Promise<Player[]> => {
  return await prisma.player.findMany();
};

export const updatePlayer = async (
  id: string,
  data: Partial<UpdatePlayerDto>
): Promise<Player> => {
  return await prisma.player.update({
    where: { id },
    data,
  });
};

export const deletePlayer = async (id: string): Promise<Player> => {
  return await prisma.player.delete({
    where: { id },
  });
};
