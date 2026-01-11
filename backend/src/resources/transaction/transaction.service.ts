import { PrismaClient, Transaction } from "@prisma/client";
import { CreateTransactionDto } from "./transaction.types";

const prisma = new PrismaClient();

export const createTransaction = async (data: CreateTransactionDto): Promise<Transaction> => {
    const newTransaction = await prisma.transaction.create({
        data: {
            ...data,
            amount: Number(data.amount),
            gameId: data.gameId,
        },
    });

    return newTransaction;
};

export const getTransactionById = async (id: string): Promise<Transaction | null> => {
    return await prisma.transaction.findUnique({
        where: { id },
    });
};

export const getTransactionsByGameId = async (gameId: string): Promise<Transaction[]> => {
    return await prisma.transaction.findMany({
        where: { gameId },
        orderBy: {
            createdAt: 'desc',
        },
    });
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
    return await prisma.transaction.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
};