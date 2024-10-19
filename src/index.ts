import { Hono } from "hono";
import { dataGames } from "./data/games";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Hello Hono!",
    endpoints: [
      "/",
      "/games",
      "/games/:id",
      "/games/search",
      "/games/filter",
      "/games/sort",
      "/users",
      "/users/:id",
      "/cart",
      "/cart/:id",
    ],
  });
});

app.get("/games", (c) => {
  return c.json(dataGames);
});

app.get("/games/:id", (c) => {
  const id = c.req.param("id");
  const game = dataGames.find((dataGames) => dataGames.id === id);

  if (!game) {
    return c.json({ message: "Game not found" }, 404);
  }

  return c.json(game);
});

export default app;
