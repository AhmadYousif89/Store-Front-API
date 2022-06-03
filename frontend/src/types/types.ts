type Users = {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
};

type Products = {
  _id?: string;
  category?: string;
  name?: string;
  brand?: string;
  color?: string;
  price?: number;
  image?: string;
  description?: string;
};

type Orders = {
  _id: string;
  order_status: string;
  created_at: string;
};

export type { Users, Products, Orders };
