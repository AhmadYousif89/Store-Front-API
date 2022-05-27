type Users = {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
};

type Products = {
  _id?: string;
  category?: string;
  p_name?: string;
  brand?: string;
  color?: string;
  price?: number;
  image_url?: string;
  description?: string;
};

export type { Users, Products };
