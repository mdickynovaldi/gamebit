import { PublisherCreateInputSchema } from "../zod-prisma-types";
import { z } from "zod";

export type PublisherCreateInput = z.infer<typeof PublisherCreateInputSchema>;

export const dataPublishers: PublisherCreateInput[] = [
  {
    slug: "sony-interactive-entertainment",
    name: "Sony Interactive Entertainment",
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
