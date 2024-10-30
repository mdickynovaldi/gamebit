import { z } from "zod";

import { ImageSchema } from "../zod-prisma-types";

export const CreateImageSchema = ImageSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type Image = z.infer<typeof ImageSchema>;
export type CreateImage = z.infer<typeof CreateImageSchema>;

export const dataImages: CreateImage[] = [
  {
    id: "1",
    gameId: "1",
    url: "https://example.com/game1.jpg",
  },
  {
    id: "2",
    gameId: "2",
    url: "https://example.com/game2.jpg",
  },
  {
    id: "3",
    gameId: "3",
    url: "https://example.com/game3.jpg",
  },
];
