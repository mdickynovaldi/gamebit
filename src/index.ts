import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { apiReference } from "@scalar/hono-api-reference";

import { gamesRoute } from "./routes/games";

const app = new OpenAPIHono();

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

app.doc("/openapi.json", {
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "GameBit API",
  },
});

// Swagger UI
app.get("/swagger", swaggerUI({ url: "/openapi.json" }));
// Scalar API Reference
app.get("/docs", apiReference({ spec: { url: "/openapi.json" } }));

export default app;
