import { PrismaClient } from "@prisma/client";
import { dataGames } from "./data/games";

const prisma = new PrismaClient();

async function main() {
  // Seed games
  for (const game of dataGames) {
    const newGame = await prisma.game.upsert({
      where: { slug: game.slug },
      update: game,
      create: game,
    });

    console.log(`✅ Game: ${newGame.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
