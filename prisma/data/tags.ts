import { z } from "zod";

import { TagSchema } from "../zod-prisma-types";

export const CreateTagSchema = TagSchema.omit({
  id: true,
});

export type Tag = z.infer<typeof TagSchema>;
export type CreateTag = z.infer<typeof CreateTagSchema>;

export const dataTags: CreateTag[] = [
  {
    slug: "single-player",
    name: "Single Player",
  },
  {
    slug: "multiplayer",
    name: "Multiplayer",
  },
  {
    slug: "open-world",
    name: "Open World",
  },
  {
    slug: "story-rich",
    name: "Story Rich",
  },
  {
    slug: "first-person",
    name: "First Person",
  },
  {
    slug: "third-person",
    name: "Third Person",
  },
  {
    slug: "co-op",
    name: "Co-op",
  },
  {
    slug: "competitive",
    name: "Competitive",
  },
];
