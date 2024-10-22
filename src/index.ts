import { Hono } from "hono";
import { dataGames, GameSchema } from "./data/games";
import { dataUsers, UserSchema } from "./data/users";
import { Game, User } from "./data/type";
import { nanoid } from "nanoid";
import { zValidator } from "@hono/zod-validator";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

const app = new Hono();

app.get("/", (c) => {
  return c.json(
    {
      message: "GameBit API",
      endpoints: ["/", "/games", "/users"],
    },
    200
  );
});

app.get("/games", (c) => {
  const formattedGames = dataGames.map((game) => ({
    ...game,
    releaseDate: format(new Date(game.releaseDate), "EEEE, d MMMM yyyy", {
      locale: localeId,
    }),
  }));
  return c.json(formattedGames, 200);
});

app.get("/games/:slug", (c) => {
  const slug = c.req.param("slug").replace(/-/g, " ");
  const game = dataGames.find(
    (game) => game.name.toLowerCase() === slug.toLowerCase()
  );

  if (!game) {
    return c.json({ message: "Game tidak ditemukan" }, 404);
  }

  return c.json(game, 200);
});

app.post("/games", zValidator("json", GameSchema), (c) => {
  try {
    const id = nanoid();
    const validatedGame = c.req.valid("json");
    const currentDate = new Date().toISOString();
    const gameWithId: Game = {
      id,
      ...validatedGame,
      updatedAt: currentDate,
      releaseDate: currentDate,
    };

    dataGames.push(gameWithId);

    const formattedGame = {
      ...gameWithId,
      releaseDate: format(
        new Date(gameWithId.releaseDate),
        "EEEE, d MMMM yyyy",
        {
          locale: localeId,
        }
      ),
    };

    return c.json(
      { message: "Game successfully added", game: formattedGame },
      201
    );
  } catch (error) {
    return c.json({ message: "Failed to add game", error: error }, 400);
  }
});

app.put("/games/edit/:slug", zValidator("json", GameSchema), (c) => {
  const slug = c.req.param("slug").replace(/-/g, " ");
  const updatedGameData = c.req.valid("json");
  const currentDate = new Date().toISOString();
  const gameIndex = dataGames.findIndex(
    (game) => game.name.toLowerCase() === slug.toLowerCase()
  );

  if (gameIndex === -1) {
    return c.json({ message: "Game not found" }, 404);
  }

  const updatedGame = {
    ...dataGames[gameIndex],
    ...updatedGameData,
    updatedAt: format(new Date(currentDate), "EEEE, d MMMM yyyy | HH:mm:ss", {
      locale: localeId,
    }),
  };

  dataGames.splice(gameIndex, 1, updatedGame);

  return c.json(
    { message: "Game successfully updated", game: updatedGame },
    200
  );
});

app.delete("/games/:slug", (c) => {
  const slug = c.req.param("slug").replace(/-/g, " ");
  const gameIndex = dataGames.findIndex(
    (game) => game.name.toLowerCase() === slug.toLowerCase()
  );

  if (gameIndex === -1) {
    return c.json({ message: "Game not found" }, 404);
  }

  dataGames.splice(gameIndex, 1);
  return c.json({ message: "Game deleted successfully" }, 200);
});

app.get("/users", (c) => {
  const formattedUsers = dataUsers.map((user) => ({
    ...user,
    createdAt: format(new Date(user.createdAt), "EEEE, d MMMM yyyy", {
      locale: localeId,
    }),
    updatedAt: format(new Date(user.updatedAt), "EEEE, d MMMM yyyy", {
      locale: localeId,
    }),
  }));
  return c.json(formattedUsers, 200);
});

app.get("/users/:id", (c) => {
  const id = c.req.param("id");
  const user = dataUsers.find((user) => user.id === id);
  return c.json(user, 200);
});

app.post("/users", zValidator("json", UserSchema), async (c) => {
  const id = nanoid();
  const validatedUser = c.req.valid("json");
  const currentDate = new Date().toISOString();
  const userWithId: User = {
    id,
    ...validatedUser,
    createdAt: currentDate,
    updatedAt: currentDate,
  };

  const existingUser = dataUsers.find(
    (user) => user.email === validatedUser.email
  );

  if (existingUser) {
    return c.json({ message: "User with this email already exists" }, 400);
  }

  dataUsers.push(userWithId);

  const formattedUser = {
    ...userWithId,
    createdAt: format(
      new Date(userWithId.createdAt),
      "EEEE, d MMMM yyyy | HH:mm:ss",
      {
        locale: localeId,
      }
    ),
    updatedAt: format(
      new Date(userWithId.updatedAt),
      "EEEE, d MMMM yyyy | HH:mm:ss",
      {
        locale: localeId,
      }
    ),
  };

  return c.json(
    { message: "User added successfully", user: formattedUser },
    201
  );
});

app.put("/users/edit/:id", zValidator("json", UserSchema), (c) => {
  const id = c.req.param("id");
  const updatedUserData = c.req.valid("json");
  const currentDate = new Date().toISOString();
  const userIndex = dataUsers.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return c.json({ message: "User not found" }, 404);
  }

  const updatedUser = {
    ...dataUsers[userIndex],
    ...updatedUserData,
    updatedAt: currentDate,
  };

  dataUsers.splice(userIndex, 1, updatedUser);

  const formattedUser = {
    ...updatedUser,
    updatedAt: format(new Date(currentDate), "EEEE, d MMMM yyyy | HH:mm:ss", {
      locale: localeId,
    }),
  };

  return c.json(
    { message: "User updated successfully", user: formattedUser },
    200
  );
});

app.delete("/users/:id", (c) => {
  const id = c.req.param("id");
  const userIndex = dataUsers.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return c.json({ message: "User not found" }, 404);
  }

  dataUsers.splice(userIndex, 1);
  return c.json({ message: "User deleted successfully" }, 200);
});

export default app;
