import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getGames = async () => {
  const games = await prisma.game.findMany();
  return games;
};

getGames()
  .then((games) => {
    console.log(games);
  })
  .catch((error) => {
    console.error(error);
  });
