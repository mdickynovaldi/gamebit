import { DeveloperCreateInputSchema } from "../zod-prisma-types";
import { z } from "zod";

export type DeveloperCreateInput = z.infer<typeof DeveloperCreateInputSchema>;

export const dataDevelopers: DeveloperCreateInput[] = [
  {
    slug: "insomniac-games",
    name: "Insomniac Games",
  },
  {
    slug: "rockstar-games",
    name: "Rockstar Games",
  },
  {
    slug: "naughty-dog",
    name: "Naughty Dog",
  },
];
