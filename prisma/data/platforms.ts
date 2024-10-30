import { z } from "zod";

import { PlatformSchema } from "../zod-prisma-types";

export const CreatePlatformSchema = PlatformSchema.omit({
  id: true,
});

export type Platform = z.infer<typeof PlatformSchema>;
export type CreatePlatform = z.infer<typeof CreatePlatformSchema>;

export const dataPlatforms: CreatePlatform[] = [
  {
    slug: "windows",
    name: "Windows",
  },
  {
    slug: "macos",
    name: "macOS",
  },
  {
    slug: "linux-ubuntu",
    name: "Linux Ubuntu",
  },
  {
    slug: "playstation-4",
    name: "PlayStation 4",
  },
  {
    slug: "playstation-5",
    name: "PlayStation 5",
  },
  {
    slug: "xbox-series-x",
    name: "Xbox Series X",
  },
  {
    slug: "nintendo-switch",
    name: "Nintendo Switch",
  },
  {
    slug: "xbox-one",
    name: "Xbox One",
  },
];
