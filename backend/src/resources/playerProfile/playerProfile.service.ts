import { PrismaClient, PlayerProfile } from "@prisma/client";
import {
  CreatePlayerProfileDto,
  UpdatePlayerProfileDto,
} from "./playerProfile.types";

const prisma = new PrismaClient();

export const createPlayerProfile = async (
  profile: CreatePlayerProfileDto
): Promise<PlayerProfile> => {
  return await prisma.playerProfile.create({
    data: {
      profileName: profile.profileName,
      description: profile.description,
    },
  });
};

export const getAllPlayerProfiles = async (): Promise<PlayerProfile[]> => {
  return await prisma.playerProfile.findMany();
};

export const getPlayerProfileById = async (
  id: string
): Promise<PlayerProfile | null> => {
  return await prisma.playerProfile.findUnique({
    where: { id },
  });
};

export const updatePlayerProfile = async (
  id: string,
  profile: UpdatePlayerProfileDto
): Promise<PlayerProfile | null> => {
  return await prisma.playerProfile.update({
    where: { id },
    data: {
      profileName: profile.profileName,
      description: profile.description,
    },
  });
};

export const deletePlayerProfile = async (
  id: string
): Promise<PlayerProfile | null> => {
  const existingPlayerProfile = await prisma.playerProfile.findUnique({
    where: { id },
  });

  if (!existingPlayerProfile) {
    throw new Error(`Perfil de Usuário com id ${id} não encontrado`);
  }

  await prisma.playerProfile.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  return existingPlayerProfile;
};
