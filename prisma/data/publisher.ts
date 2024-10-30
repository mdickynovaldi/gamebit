import { PublisherCreateInputSchema } from "../zod-prisma-types";
import { z } from "zod";

export type PublisherCreateInput = z.infer<typeof PublisherCreateInputSchema>;

export const dataPublishers: PublisherCreateInput[] = [
  {
    slug: "sony-interactive-entertainment",
    name: "Sony Interactive Entertainment",
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
