import axios from "axios";

const API_URL = "/api/";

// Register user
const registration = async (userData: object) => {
  const response = await axios.post(API_URL + "register", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData: object) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Update user
const updateUser = async (userData: object, token: string) => {
  const response = await axios.put(API_URL + "users", userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Delete user
const delUser = async (uId: string, token: string) => {
  const response = await axios.delete(API_URL + uId, {
    headers: { Authorization: `Bearer ${token}` },
    data: { uId },
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const addToCart = async (oId: number, orderData: object, token: string) => {
  const response = await axios.post(
    API_URL + `user/account/orders/${oId}/products`,
    orderData,
    {
      headers: { Authorization: `Bearer ${token}` },
      data: { oId },
    },
  );
  return response.data;
};

const userService = {
  registration,
  login,
  logout,
  updateUser,
  delUser,
  addToCart,
};

export default userService;
