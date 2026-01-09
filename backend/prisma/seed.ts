import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  PlayerIcon,
  PlayerStatus,
} from "../src/resources/player/player.constants";
import { GameStatus } from "../src/resources/game/game.constants";
import { PlayerProfileConstants } from "../src/resources/playerProfile/playerProfile.constants";

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding database...");

  console.log("Creating Player Profiles...");
  await prisma.playerProfile.createMany({
    data: [
      {
        id: PlayerProfileConstants.ADMIN,
        profileName: "Admin",
        description: "Administrador com acesso total",
      },
      {
        id: PlayerProfileConstants.USER,
        profileName: "User",
        description: "Usuário padrão com acesso limitado",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Creating a Game...");
  const game = await prisma.game.create({
    data: {
      status: GameStatus.IN_PROGRESS,
    },
  });

  console.log("Creating Players...");
  const salt = await bcrypt.genSalt(
    parseInt(process.env.ROUNDS_BCRYPT ?? "10")
  );
  const hashedAdminPassword = await bcrypt.hash("admin123", salt);
  const hashedUserPassword = await bcrypt.hash("banco123", salt);
  const players = await Promise.all([
    prisma.player.create({
      data: {
        username: "admin",
        password: hashedAdminPassword,
        profileId: PlayerProfileConstants.ADMIN,
      },
    }),
    prisma.player.create({
      data: {
        username: "Bank",
        password: hashedUserPassword,
        profileId: PlayerProfileConstants.USER,
      },
    }),
    prisma.player.create({
      data: {
        username: "Alice",
        password: hashedUserPassword,
        profileId: PlayerProfileConstants.USER,
      },
    }),
    prisma.player.create({
      data: {
        username: "Bob",
        password: hashedUserPassword,
        profileId: PlayerProfileConstants.USER,
      },
    }),
    prisma.player.create({
      data: {
        username: "Maria",
        password: hashedUserPassword,
        profileId: PlayerProfileConstants.USER,
      },
    }),
    prisma.player.create({
      data: {
        username: "João",
        password: hashedUserPassword,
        profileId: PlayerProfileConstants.USER,
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
