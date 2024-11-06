import { zValidator } from "@hono/zod-validator";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";

import { db } from "../db";
import { GameCreateInputSchema } from "../../prisma/zod-prisma-types";
import { GameBodySchema, GameParamSchema } from "../../prisma/data/games";
import { createSlug } from "../utils/string";

export const gamesRoute = new OpenAPIHono();

gamesRoute.get("/", async (c) => {
  const games = await db.game.findMany({
    include: {
      image: true,
      developers: {
        select: {
          slug: true,
          name: true,
        },
      },
      publishers: {
        select: {
          slug: true,
          name: true,
        },
      },
      platforms: {
        select: {
          slug: true,
          name: true,
        },
      },
      genres: {
        select: {
          name: true,
        },
      },
      tags: {
        select: {
          name: true,
        },
      },
    },
  });
  return c.json(games);
});

gamesRoute.get("/:slug", async (c) => {
  const slug = c.req.param("slug");

  const game = await db.game.findUnique({
    where: { slug: slug },
    include: {
      platforms: { select: { slug: true, name: true } },
      genres: { select: { name: true } },
      tags: { select: { name: true } },
    },
  });

  if (!game) return c.json({ message: "Game not found" }, 404);

  return c.json(game);
});

gamesRoute.put(
  "/:slug",
  zValidator("param", GameParamSchema),
  zValidator("json", GameBodySchema),
  async (c) => {
    const { slug } = c.req.valid("param");
    const body = c.req.valid("json");

    try {
      const game = await db.game.update({
        where: { slug: slug },
        data: {
          ...body,
          slug: body.name ? createSlug(body.name) : undefined,
        },
        include: {
          developers: { select: { slug: true, name: true } },
          publishers: { select: { slug: true, name: true } },
          image: true,
          platforms: { select: { slug: true, name: true } },
          genres: { select: { name: true } },
          tags: { select: { name: true } },
        },
      });

      return c.json(game);
    } catch (error) {
      console.error("Error updating game:", error);
      return c.json({ message: "Game not found", slug }, 404);
    }
  }
);

gamesRoute.post("/", zValidator("json", GameCreateInputSchema), async (c) => {
  try {
    const body = c.req.valid("json");

    const game = await db.game.create({
      data: body,
      include: {
        developers: {
          select: {
            slug: true,
            name: true,
          },
        },
        publishers: {
          select: {
            slug: true,
            name: true,
          },
        },
        image: true,
        platforms: {
          select: {
            slug: true,
            name: true,
          },
        },
        genres: {
          select: {
            name: true,
          },
        },
        tags: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json(game, 201);
  } catch (error) {
    console.error("Error creating game:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
});

gamesRoute.delete("/:slug", async (c) => {
  const slug = c.req.param("slug");

  try {
    const game = await db.game.delete({
      where: { slug: slug },
    });
    return c.json({ message: "Game successfully deleted" });
  } catch (error) {
    return c.json({ message: "Game not found" }, 404);
  }
});
