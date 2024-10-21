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
    id: "1",
    name: "John Doe",
    email: "john@doe.com",
    region: "Indonesia",
    avatar: "https://example.com/avatar.jpg",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@doe.com",
    region: "Indonesia",
    avatar: "https://example.com/avatar.jpg",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
  },
];
