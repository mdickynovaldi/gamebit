import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { db } from "./db";
import { GameCreateInputSchema, GameSchema } from "../prisma/zod-prisma-types";

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
    include: {
      platforms: { omit: { id: true } },
      genres: true,
      tags: true,
      developers: true,
      publishers: true,
    },
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

app.post("/games", zValidator("json", GameCreateInputSchema), (c) => {
  return c.json({});
});

app.put("/games/edit/:slug", zValidator("json", GameSchema), (c) => {
  return c.json({});
});

app.delete("/games/:slug", (c) => {
  return c.json({});
});

export default app;
