import axios from "axios";

const API_URL = "/api/user/account/orders";

// Get all orders
const getOrders = async (token: string) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Create order
const createOrder = async (orderData: object, token: string) => {
  const response = await axios.post(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
    data: { orderData },
  });
  return response.data;
};

// Update order
const updateOrder = async (orderId: number, token: string) => {
  const response = await axios.put(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
    data: { orderId },
  });
  return response.data;
};

// Delete Order
const delOrder = async (orderId: number, token: string) => {
  const response = await axios.delete(API_URL + orderId, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const orderService = {
  getOrders,
  createOrder,
  updateOrder,
  delOrder,
};

export default orderService;
