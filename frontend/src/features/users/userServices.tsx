import axios from "axios";

const API_URL = "/api/";

// Register user
const registration = async (userData: any) => {
  const response = await axios.post(API_URL + "signup", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData: any) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Update user
const updateUser = async (userData: any) => {
  const response = await axios.put(API_URL + "users", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Delete user
const delUser = async (userData: any) => {
  const response = await axios.delete(API_URL + "users/:id", userData);
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
