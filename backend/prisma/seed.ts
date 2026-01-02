import { PrismaClient } from "@prisma/client";
import {
  PlayerIcon,
  PlayerStatus,
} from "../src/resources/player/player.constants";

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding database...");
  await prisma.player.createMany({
    data: [
      {
        name: "Bank",
        email: "bank@gmail.com",
        password: "banco123",
        money: 1000,
        status: PlayerStatus.IDLE,
        icon: PlayerIcon.ACCOUNT_CIRCLE,
      },
      {
        name: "Alice",
        email: "alice@gmail.com",
        password: "banco123",
        money: 2000,
        status: PlayerStatus.IDLE,
        icon: PlayerIcon.PIX,
      },
      {
        name: "Bob",
        email: "bob@gmail.com",
        password: "banco123",
        money: 2000,
        status: PlayerStatus.IDLE,
        icon: PlayerIcon.SAVINGS,
      },
      {
        name: "Maria",
        email: "maria@gmail.com",
        password: "banco123",
        money: 2000,
        status: PlayerStatus.IDLE,
        icon: PlayerIcon.CREDIT_CARD,
      },
      {
        name: "João",
        email: "joao@gmail.com",
        password: "banco123",
        money: 2000,
        status: PlayerStatus.IDLE,
        icon: PlayerIcon.POINT_OF_SALE,
      },
    ],
  });
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
