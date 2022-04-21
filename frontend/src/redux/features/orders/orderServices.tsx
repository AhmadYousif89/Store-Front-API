import axios from "axios";

const API_URL = "/api/user/account/orders/";

// Create order
const createOrder = async (userId: object, token: string) => {
  const response = await axios.post(API_URL, userId, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get all orders
const getUserOrders = async (userId: string, token: string) => {
  const response = await axios.get(`/api/user/${userId}/account/orders`, {
    headers: { Authorization: `Bearer ${token}` },
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
    data: orderId,
  });
  return response.data;
};

const orderService = {
  getUserOrders,
  createOrder,
  updateOrder,
  delOrder,
};

export default orderService;
