export type GameType = {
  id: string;
  name: string;
  price: number;
  description: string;
  date: string;
  image: string;
  category: string;
  platform: string;
  rating: number;
  developer: string;
  publisher: string;
  tags: string[];
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  region: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};
