import { z } from "zod";

import { GenreSchema } from "../zod-prisma-types";

export const CreateGenreSchema = GenreSchema.omit({
  id: true,
});

export type Genre = z.infer<typeof GenreSchema>;
export type CreateGenre = z.infer<typeof CreateGenreSchema>;

export const dataGenres: CreateGenre[] = [
  {
    slug: "action",
    name: "Action",
  },
  {
    slug: "adventure",
    name: "Adventure",
  },
  {
    slug: "rpg",
    name: "RPG",
  },
  {
    slug: "strategy",
    name: "Strategy",
  },
  {
    slug: "simulation",
    name: "Simulation",
  },
  {
    slug: "sports",
    name: "Sports",
  },
  {
    slug: "racing",
    name: "Racing",
  },
  {
    slug: "puzzle",
    name: "Puzzle",
  },
];
