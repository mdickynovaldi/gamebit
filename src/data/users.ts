import { User } from "./type";

import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().max(100),
  email: z.string().email(),
  region: z.string().max(100),
  avatar: z.string().url(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const dataUsers: User[] = [
  {
    id: "fsdafjhlhkjlhkfasd",
    name: "Elon Musk",
    email: "elon@musk.com",
    region: "Canada",
    avatar: "https://example.com/avatar.jpg",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
  },
  {
    id: "fdgioewiiiwerd",
    name: "Aldi",
    email: "aldi@gmail.com",
    region: "Indonesia",
    avatar: "https://example.com/avatar.jpg",
    createdAt: "2000-02-20",
    updatedAt: "2021-01-01",
  },
];
