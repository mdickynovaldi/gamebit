import { PrismaClient } from "@prisma/client";

import { dataGames } from "./data/games";
import { dataPlatforms } from "./data/platforms";
import Decimal from "decimal.js";

const prisma = new PrismaClient();

async function main() {
  // Seed platforms
  for (const platform of dataPlatforms) {
    const newPlatform = await prisma.platform.upsert({
      where: { slug: platform.slug },
      update: platform,
      create: platform,
    });

    console.log(`✅ Platform: ${newPlatform.name}`);
  }

  // Seed games
  for (const game of dataGames) {
    const newGame = await prisma.game.upsert({
      where: { slug: game.slug },
      update: game,
      create: {
        slug: "spider-man",
        name: "Spider Man",
        price: new Decimal(850_000), // USD
        description:
          "Spider-Man is an action-adventure game that allows players to explore New York City as Peter Parker, also known as Spider-Man. With smooth web-swinging mechanics and dynamic combat, players will face various notorious villains from the Marvel Universe while saving the city from major threats.",
        releaseDate: new Date("2021-01-01"),
        imageUrl: "https://example.com/game1.jpg",
        rating: 4.5,
        // platforms:
        // developer: "Developer 1",
        // publisher: "Publisher 1",
        // category: "Action",
        // tags: ["Action", "Adventure", "RPG"],
      },
      include: { platforms: { select: { name: true } } },
    });

    const platformsText = `(${newGame.platforms
      .map((p) => p.name)
      .join(", ")})`;

    console.log(`✅ Game: ${newGame.name} ${platformsText}`);
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
