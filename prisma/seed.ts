import { PrismaClient } from "@prisma/client";

import { dataGames } from "./data/games";
import { dataPlatforms } from "./data/platforms";
import { dataGenres } from "./data/genres";
import { dataTags } from "./data/tags";
import { dataImages } from "./data/image";
import { dataDevelopers } from "./data/developers";
import { dataPublishers } from "./data/publisher";

const prisma = new PrismaClient();

async function main() {
  // Seed publisher
  for (const publisher of dataPublishers) {
    const newPublisher = await prisma.publisher.upsert({
      where: { slug: publisher.slug },
      update: publisher,
      create: publisher,
    });
  }

  // Seed developer
  for (const developer of dataDevelopers) {
    const newDeveloper = await prisma.developer.upsert({
      where: { slug: developer.slug },
      update: developer,
      create: developer,
    });
  }

  // Seed image
  for (const image of dataImages) {
    await prisma.image.upsert({
      where: { id: image.id },
      update: {},
      create: {
        ...image,
        gameId: image.gameId,
      },
    });

    // Seed tags
    for (const tag of dataTags) {
      const newTag = await prisma.tag.upsert({
        where: { slug: tag.slug },
        update: tag,
        create: tag,
      });

      console.log(`✅ Tag: ${newTag.name}`);
    }

    // Seed genres
    for (const genre of dataGenres) {
      const newGenre = await prisma.genre.upsert({
        where: { slug: genre.slug },
        update: genre,
        create: genre,
      });

      console.log(`✅ Genre: ${newGenre.name}`);
    }

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
}
