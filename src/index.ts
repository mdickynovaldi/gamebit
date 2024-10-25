import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { CreateGameSchema } from "../prisma/data/games";
import { GameSchema } from "../prisma/zod";
import { db } from "./db";

const app = new Hono();

app.get("/", (c) => {
  return c.json(
    {
      message: "GameBit API",
      endpoints: ["/", "/games"],
    },
    200
  );
});

app.get("/games", async (c) => {
  const games = await db.game.findMany({
    omit: {
      createdAt: true,
      updatedAt: true,
    },
    // include: {
    //   developers: true,
    //   publishers: true,
    //   platforms: true,
    //   genres: true,
    //   tags: true,
    // },
  });

  const modifiedGames = games.map((game) => ({
    ...game,
    price: Number(game.price),
  }));

  return c.json(modifiedGames);
});

app.get("/games/:slug", async (c) => {
  const slug = c.req.param("slug");

  const game = await db.game.findUnique({
    where: { slug: slug },
  });

  if (!game) return c.json({ message: "Game tidak ditemukan" }, 404);

  return c.json(game);
});

app.post("/games", zValidator("json", CreateGameSchema), (c) => {
  return c.json({});
});

app.put("/games/edit/:slug", zValidator("json", GameSchema), (c) => {
  return c.json({});
});

app.delete("/games/:slug", (c) => {
  return c.json({});
});

export default app;
