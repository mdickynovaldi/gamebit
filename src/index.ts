import { Hono } from "hono";

import { gamesRoute } from "./routes/games";

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

app.route("/games", gamesRoute);

export default app;
