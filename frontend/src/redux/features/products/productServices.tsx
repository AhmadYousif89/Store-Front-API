import axios from "axios";

const API_URL = "/api/products";

// Get all products
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const productServices = { getProducts };

export default productServices;
