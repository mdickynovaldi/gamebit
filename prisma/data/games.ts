import { z } from "zod";
import Decimal from "decimal.js";

import { GameSchema } from "../zod";

export const CreateGameSchema = GameSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Game = z.infer<typeof GameSchema>;
export type CreateGame = z.infer<typeof CreateGameSchema>;

export const dataGames: CreateGame[] = [
  {
    slug: "spider-man",
    name: "Spider Man",
    price: new Decimal(850_000), // USD
    description:
      "Spider-Man is an action-adventure game that allows players to explore New York City as Peter Parker, also known as Spider-Man. With smooth web-swinging mechanics and dynamic combat, players will face various notorious villains from the Marvel Universe while saving the city from major threats.",
    releaseDate: new Date("2021-01-01"),
    imageUrl: "https://example.com/game1.jpg",
    rating: 4.5,
    // Need to seed them first
    // developer: "Developer 1",
    // publisher: "Publisher 1",
    // category: "Action",
    // platform: "PC",
    // tags: ["Action", "Adventure", "RPG"],
  },
  {
    slug: "gta-v",
    name: "GTA V",
    price: new Decimal(400_000),
    description:
      "Grand Theft Auto V is an action-adventure game that allows players to explore the open world of Los Santos and Blaine County. With a focus on crime and driving, players can engage in various activities such as heists, races, and street battles while interacting with other characters and completing missions.",
    releaseDate: new Date("2021-01-02"),
    imageUrl: "https://example.com/game2.jpg",
    rating: 4.5,
    // category: "Action",
    // platform: "PC",
    // developer: "Developer 2",
    // publisher: "Publisher 2",
    // tags: ["Action", "Adventure", "RPG"],
  },
  {
    slug: "the-last-of-us",
    name: "The Last of Us",
    price: new Decimal(900_000),
    description:
      "The Last of Us is an action-adventure game that follows the journey of Joel and Ellie as they navigate through a post-apocalyptic world filled with dangerous creatures and other survivors. With a focus on survival and storytelling, players will encounter various challenges and make difficult decisions while trying to protect Ellie from the harsh realities of the world.",
    releaseDate: new Date("2021-01-03"),
    imageUrl: "https://example.com/game3.jpg",
    rating: 4.5,
    // category: "Action",
    // platform: "PC",
    // developer: "Developer 3",
    // publisher: "Publisher 3",
    // tags: ["Action", "Adventure", "RPG"],
  },
];
