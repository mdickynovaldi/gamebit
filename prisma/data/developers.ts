import { DeveloperCreateInputSchema } from "../zod-prisma-types";
import { z } from "zod";

export type DeveloperCreateInput = z.infer<typeof DeveloperCreateInputSchema>;

export const dataDevelopers: DeveloperCreateInput[] = [
  {
    slug: "insomniac-games",
    name: "Insomniac Games",
    games: {
      connect: [{ slug: "spider-man" }],
    },
  },
  {
    slug: "rockstar-games",
    name: "Rockstar Games",
    games: {
      connect: [{ slug: "gta-v" }],
    },
  },
  {
    slug: "naughty-dog",
    name: "Naughty Dog",
    games: {
      connect: [{ slug: "the-last-of-us" }],
    },
  },
];
