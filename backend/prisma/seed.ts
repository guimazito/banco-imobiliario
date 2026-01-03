import { PrismaClient } from "@prisma/client";
import {
  PlayerIcon,
  PlayerStatus,
} from "../src/resources/player/player.constants";
import { GameStatus } from "../src/resources/game/game.constants";

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding database...");

  console.log("Creating a Game...");
  const game = await prisma.game.create({
    data: {
      status: GameStatus.IN_PROGRESS,
    },
  });

  console.log("Creating Players...");
  const players = await Promise.all([
    prisma.player.create({
      data: {
        username: "Bank",
        password: "banco123",
      },
    }),
    prisma.player.create({
      data: {
        username: "Alice",
        password: "banco123",
      },
    }),
    prisma.player.create({
      data: {
        username: "Bob",
        password: "banco123",
      },
    }),
    prisma.player.create({
      data: {
        username: "Maria",
        password: "banco123",
      },
    }),
    prisma.player.create({
      data: {
        username: "João",
        password: "banco123",
      },
    }),
  ]);

  console.log("Creating GamePlayers...");
  const gamePlayer = await Promise.all([
    prisma.gamePlayer.create({
      data: {
        gameId: game.id,
        playerId: players[1].id,
        playerMoney: 2000,
        playerStatus: PlayerStatus.IDLE,
        playerIcon: PlayerIcon.PIX,
      },
    }),
    prisma.gamePlayer.create({
      data: {
        gameId: game.id,
        playerId: players[2].id,
        playerMoney: 2000,
        playerStatus: PlayerStatus.IDLE,
        playerIcon: PlayerIcon.SAVINGS,
      },
    }),
    prisma.gamePlayer.create({
      data: {
        gameId: game.id,
        playerId: players[3].id,
        playerMoney: 2000,
        playerStatus: PlayerStatus.IDLE,
        playerIcon: PlayerIcon.CREDIT_CARD,
      },
    }),
    prisma.gamePlayer.create({
      data: {
        gameId: game.id,
        playerId: players[4].id,
        playerMoney: 2000,
        playerStatus: PlayerStatus.IDLE,
        playerIcon: PlayerIcon.POINT_OF_SALE,
      },
    }),
  ]);
}

seed()
  .then(async () => {
    console.log("Database seeded successfully.");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Error seeding database:", error);
    await prisma.$disconnect();
  });
