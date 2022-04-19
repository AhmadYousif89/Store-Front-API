import axios from "axios";

const API_URL = "/api/user/account/orders";

// Get all orders
const getUserOrders = async (userId: string, token: string) => {
  const response = await axios.get(`/api/user/${userId}/account/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.data) {
    localStorage.setItem("orders", JSON.stringify(response.data));
  }
  return response.data;
};

// Create order
const createOrder = async (userId: string, token: string) => {
  const response = await axios.post(API_URL, userId, {
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
  });
  return response.data;
};

// Remove user orders
const removeOrders = () => {
  localStorage.removeItem("orders");
};

const orderService = {
  getUserOrders,
  createOrder,
  updateOrder,
  delOrder,
  removeOrders,
};

export default orderService;
