type Users = {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
};
type UserToken = {
  _id?: string;
  token?: string;
  i_at?: string;
};
type Orders = {
  _id?: string;
  order_status?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string | null;
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
type OP = {
  _id?: string;
  order_id?: string;
  product_id?: string;
  quantity?: number;
  created_at?: string;
};
type Error = {
  name?: string;
  message?: string;
  stack?: string;
  status?: number;
};

export { Users, UserToken, Orders, Products, OP, Error };
