type Product = {
  id: string;
  quantity: string;
  user: string;
};

type User = {
  id: string;
  username: string;
};

export type CreateListRequest = {
  title: string;
  users: User[];
  products: Product[];
};
