import { Hono } from "hono";
import {
  CreateGameSchema,
  dataGames as dataGamesInitial,
  Game,
  GameSchema,
} from "./data/games";
import { dataUsers as dataUsersInitial, User, UserSchema } from "./data/users";
import { nanoid } from "nanoid";
import { zValidator } from "@hono/zod-validator";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import slugify from "slugify";

const app = new Hono();

let dataGames = structuredClone(dataGamesInitial);
let dataUsers = structuredClone(dataUsersInitial);

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
  const formattedGames = dataGames.map((game) => {
    if (!game.releaseDate) {
      return game;
    }

    const formatString = "EEEE, d MMMM yyyy";

    return {
      ...game,
      releaseDates: [
        {
          lang: "en",
          date: format(game.releaseDate, formatString),
        },
        {
          lang: "id",
          date: format(game.releaseDate, formatString, { locale: localeId }),
        },
      ],
    };
  });
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

app.post("/games", zValidator("json", CreateGameSchema), (c) => {
  try {
    const gameData = c.req.valid("json");

    const newGame: Game = {
      ...gameData,
      id: nanoid(),
      slug: slugify(gameData.name),
      releaseDate: new Date(gameData.releaseDate),
      updatedAt: new Date(),
    };

    dataGames = [...dataGames, newGame];

    return c.json({ message: "Game successfully added", game: newGame }, 201);
  } catch (error) {
    return c.json({ message: "Failed to add game", error: error }, 400);
  }
});

app.put("/games/edit/:slug", zValidator("json", GameSchema), (c) => {
  const slug = c.req.param("slug");
  const gameData = c.req.valid("json");

  const updatedGame = {
    ...gameData,
    updatedAt: new Date(),
  };

  dataGames = dataGames.map((game) => {
    return game.slug === slug ? updatedGame : game;
  });

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
  return c.json(dataUsers, 200);
});

app.get("/users/:id", (c) => {
  const id = c.req.param("id");
  const user = dataUsers.find((user) => user.id === id);
  return c.json(user, 200);
});

app.post("/users", zValidator("json", UserSchema), async (c) => {
  const userData = c.req.valid("json");

  const newUser: User = {
    ...userData,
    id: nanoid(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const existingUser = dataUsers.find((user) => user.email === userData.email);

  if (existingUser) {
    return c.json({ message: "User with this email already exists" }, 400);
  }

  dataUsers.push(newUser);

  const formattedUser = {
    ...newUser,
    createdAt: newUser.createdAt,
    updatedAt: newUser.updatedAt,
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

  // FIX: update using map function/method
  // dataUsers.splice(userIndex, 1, updatedUser);

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
