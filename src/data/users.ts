import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().max(100),
  email: z.string().email(),
  region: z.string().max(100),
  avatar: z.string().url(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const dataUsers: User[] = [
  {
    id: "fsdafjhlhkjlhkfasd",
    name: "Elon Musk",
    email: "elon@musk.com",
    region: "Canada",
    avatar: "https://example.com/avatar.jpg",
    createdAt: new Date("2021-01-01"),
    updatedAt: new Date("2021-01-01"),
  },
  {
    id: "fdgioewiiiwerd",
    name: "Aldi",
    email: "aldi@gmail.com",
    region: "Indonesia",
    avatar: "https://example.com/avatar.jpg",
    createdAt: new Date("2000-02-20"),
    updatedAt: new Date("2021-01-01"),
  },
];
