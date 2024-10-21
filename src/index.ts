import { Hono } from "hono";
import { dataGames } from "./data/games";
import { dataUsers } from "./data/users";
import { Game, User } from "./data/type";
import { nanoid } from "nanoid";

const app = new Hono();

app.get("/", (c) => {
  return c.json(
    {
      message: "Hello Everyone!",
      endpoints: ["/", "/games", "/users"],
    },
    200
  );
});

app.get("/games", (c) => {
  return c.json(dataGames, 200);
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

app.post("/games", async (c) => {
  const newGame = await c.req.json();
  const id = nanoid();

  const gameWithId: Game = { ...newGame, id };

  dataGames.push(gameWithId);

  return c.json(
    { message: "Game berhasil ditambahkan", game: gameWithId },
    201
  );
});

app.put("/games/:slug", async (c) => {
  const slug = c.req.param("slug").replace(/-/g, " ");
  const updatedGameData = await c.req.json();
  const gameIndex = dataGames.findIndex(
    (game) => game.name.toLowerCase() === slug.toLowerCase()
  );

  if (gameIndex === -1) {
    return c.json({ message: "Game tidak ditemukan" }, 404);
  }

  const updatedGame = {
    ...dataGames[gameIndex],
    ...updatedGameData,
    id: dataGames[gameIndex].id,
  };

  dataGames[gameIndex] = updatedGame;

  return c.json(
    { message: "Game berhasil diperbarui", game: updatedGame },
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

app.post("/users", async (c) => {
  const newUser = await c.req.json();
  const id = nanoid();
  const userWithId = { ...newUser, id };

  const existingUser = dataUsers.find((user) => user.email === newUser.email);

  if (existingUser) {
    return c.json({ message: "User with this email already exists" }, 400);
  }

  dataUsers.push(userWithId);
  return c.json({ message: "User added successfully", user: userWithId }, 201);
});

app.put("/users/:id", async (c) => {
  const id = c.req.param("id");
  const updatedUserData: User = await c.req.json();
  const userIndex = dataUsers.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return c.json({ message: "User not found" }, 404);
  }

  const updatedUser: User = {
    ...dataUsers[userIndex],
    ...updatedUserData,
    id: dataUsers[userIndex].id,
  };

  dataUsers[userIndex] = updatedUser;

  return c.json(
    { message: "User updated successfully", user: updatedUser },
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
