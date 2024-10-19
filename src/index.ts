import { Hono } from "hono";
import { dataGames } from "./data/games";
import { dataUsers } from "./data/users";
import { UserType } from "./data/type";

const app = new Hono();

app.get("/", (c) => {
  return c.json(
    {
      message: "Hello Everyone!",
      endpoints: [
        "/",
        "/games",
        "/games/:id",
        "/users",
        "/users/:id",
        "/cart",
        "/cart/:id",
      ],
    },
    200
  );
});

app.get("/games", (c) => {
  return c.json(dataGames, 200);
});

app.get("/games/:id", (c) => {
  const id = c.req.param("id");
  const game = dataGames.find((game) => game.id === id);

  if (!game) {
    return c.json({ message: "Game not found" }, 404);
  }

  return c.json(game, 200);
});

app.post("/games", async (c) => {
  const newGame = await c.req.json();

  dataGames.push(newGame);

  return c.json({ message: "Game added successfully", game: newGame }, 201);
});

app.put("/games/:id", async (c) => {
  const id = c.req.param("id");
  const updatedGame = await c.req.json();
  const gameIndex = dataGames.findIndex((game) => game.id === id);
  dataGames[gameIndex] = updatedGame;
  return c.json(
    { message: "Game updated successfully", game: updatedGame },
    200
  );
});

app.delete("/games/:id", (c) => {
  const id = c.req.param("id");
  const gameIndex = dataGames.findIndex((game) => game.id === id);

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
  const existingUser = dataUsers.find((user) => user.email === newUser.email);

  if (existingUser) {
    return c.json({ message: "User with this email already exists" }, 400);
  }

  dataUsers.push(newUser);
  return c.json({ message: "User added successfully", user: newUser }, 201);
});

app.put("/users/:id", async (c) => {
  const id = c.req.param("id");
  const updatedUserData: UserType = await c.req.json();
  const userIndex = dataUsers.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return c.json({ message: "User not found" }, 404);
  }

  const updatedUser: UserType = {
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
