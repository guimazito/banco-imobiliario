import { PrismaClient, Player } from "@prisma/client";
import { CreatePlayerDto } from "./player.types";

const prisma = new PrismaClient();

export const createPlayer = async (data: CreatePlayerDto): Promise<Player> => {
    return await prisma.player.create({
        data: {
            ...data,
            money: Number(data.money),
        },
    });
};

export const getPlayerById = async (id: string): Promise<Player | null> => {
    return await prisma.player.findUnique({
        where: { id },
    });
};

export const getAllPlayers = async (): Promise<Player[]> => {
    return await prisma.player.findMany();
};

export const updatePlayer = async (
    id: string,
    data: Partial<CreatePlayerDto>
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