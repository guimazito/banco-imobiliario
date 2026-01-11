import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0;');
  await prisma.game.deleteMany({});
  await prisma.gamePlayer.deleteMany({});
  await prisma.player.deleteMany({});
  await prisma.playerProfile.deleteMany({});
  await prisma.transaction.deleteMany({});
  await prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1;');
}

main().finally(() => prisma.$disconnect());