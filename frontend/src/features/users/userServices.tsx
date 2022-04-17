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
const updateUser = async (userId: string, token: string) => {
  const response = await axios.put(API_URL + "users", {
    headers: { Authorization: `Bearer ${token}` },
    data: { userId },
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Delete user
const delUser = async (userId: string, token: string) => {
  const response = await axios.delete(API_URL + userId, {
    headers: { Authorization: `Bearer ${token}` },
    data: { userId },
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

const authService = {
  registration,
  login,
  logout,
  updateUser,
  delUser,
};

export default authService;
