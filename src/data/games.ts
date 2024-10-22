import { z } from "zod";

export const GameSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string().max(100),
  price: z.number().positive(),
  description: z.string().max(1000),
  releaseDate: z.coerce.date(),
  imageUrl: z.string().url().optional(),
  category: z.string().max(100),
  platform: z.string().max(100),
  rating: z.number().min(0).max(5),
  developer: z.string().max(100),
  publisher: z.string().max(100),
  tags: z.array(z.string()).max(10),
  updatedAt: z.coerce.date(),
});

export const CreateGameSchema = z.object({
  name: z.string().max(100),
  price: z.number().positive(),
  description: z.string().max(1000),
  releaseDate: z.string().date(),
  imageUrl: z.string().url(),
  category: z.string().max(100),
  platform: z.string().max(100),
  rating: z.number().min(0).max(5),
  developer: z.string().max(100),
  publisher: z.string().max(100),
  tags: z.array(z.string()).max(10),
});

export type Game = z.infer<typeof GameSchema>;

export const dataGames: Game[] = [
  {
    id: "fsdafjhlhkjlhkfasd",
    slug: "spider-man",
    name: "Spider Man",
    price: 100000, // USD
    description:
      "Spider-Man is an action-adventure game that allows players to explore New York City as Peter Parker, also known as Spider-Man. With smooth web-swinging mechanics and dynamic combat, players will face various notorious villains from the Marvel Universe while saving the city from major threats.",
    releaseDate: new Date("2021-01-01"),
    imageUrl: "https://example.com/game1.jpg",
    category: "Action",
    platform: "PC",
    rating: 4.5,
    developer: "Developer 1",
    publisher: "Publisher 1",
    tags: ["Action", "Adventure", "RPG"],
    updatedAt: new Date("2021-01-01"),
  },
  {
    id: "fdgioewiiiwerd",
    slug: "gta-v",
    name: "GTA V",
    price: 400000,
    description:
      "Grand Theft Auto V is an action-adventure game that allows players to explore the open world of Los Santos and Blaine County. With a focus on crime and driving, players can engage in various activities such as heists, races, and street battles while interacting with other characters and completing missions.",
    releaseDate: new Date("2021-01-02"),
    imageUrl: "https://example.com/game2.jpg",
    category: "Action",
    platform: "PC",
    rating: 4.5,
    developer: "Developer 2",
    publisher: "Publisher 2",
    tags: ["Action", "Adventure", "RPG"],
    updatedAt: new Date("2021-01-02"),
  },
  {
    id: "pppqpwee-asdjkkbcv99",
    slug: "the-last-of-us",
    name: "The Last of Us",
    price: 900000,
    description:
      "The Last of Us is an action-adventure game that follows the journey of Joel and Ellie as they navigate through a post-apocalyptic world filled with dangerous creatures and other survivors. With a focus on survival and storytelling, players will encounter various challenges and make difficult decisions while trying to protect Ellie from the harsh realities of the world.",
    releaseDate: new Date("2021-01-03"),
    imageUrl: "https://example.com/game3.jpg",
    category: "Action",
    platform: "PC",
    rating: 4.5,
    developer: "Developer 3",
    publisher: "Publisher 3",
    tags: ["Action", "Adventure", "RPG"],
    updatedAt: new Date("2021-01-03"),
  },
];
