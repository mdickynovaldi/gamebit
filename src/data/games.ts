import { Game } from "./type";

import { z } from "zod";

export const GameSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().max(100),
  price: z.number().positive(),
  description: z.string().max(1000),
  releaseDate: z.string().datetime().optional(),
  imageUrl: z.string().url(),
  category: z.string().max(100),
  platform: z.string().max(100),
  rating: z.number().min(0).max(5),
  developer: z.string().max(100),
  publisher: z.string().max(100),
  tags: z.array(z.string()).max(10),
});

export const dataGames: Game[] = [
  {
    id: "1",
    name: "Game",
    price: 100000,
    description: "Game 1 description",
    releaseDate: "2021-01-01",
    imageUrl: "https://example.com/game1.jpg",
    category: "Action",
    platform: "PC",
    rating: 4.5,
    developer: "Developer 1",
    publisher: "Publisher 1",
    tags: ["Action", "Adventure", "RPG"],
  },
  {
    id: "2",
    name: "Game 2",
    price: 400000,
    description: "Game 2 description",
    releaseDate: "2021-01-02",
    imageUrl: "https://example.com/game2.jpg",
    category: "Action",
    platform: "PC",
    rating: 4.5,
    developer: "Developer 2",
    publisher: "Publisher 2",
    tags: ["Action", "Adventure", "RPG"],
  },
  {
    id: "3",
    name: "Game 3",
    price: 900000,
    description: "Game 3 description",
    releaseDate: "2021-01-03",
    imageUrl: "https://example.com/game3.jpg",
    category: "Action",
    platform: "PC",
    rating: 4.5,
    developer: "Developer 3",
    publisher: "Publisher 3",
    tags: ["Action", "Adventure", "RPG"],
  },
];
