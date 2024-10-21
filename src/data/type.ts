export type Game = {
  id: string;
  name: string;
  price: number;
  description: string;
  date: string;
  imageUrl: string;
  category: string;
  platform: string;
  rating: number;
  developer: string;
  publisher: string;
  tags: string[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  region: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};
