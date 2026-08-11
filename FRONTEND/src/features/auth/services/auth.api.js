import axios from "axios";

const api = axios.create({
  baseURL: "https://interviewai-backend-a4o0.onrender.com",
  withCredentials: true,
});

export const register = async ({ username, email, password }) => {
  try {
    const { data } = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });

    alert(data.message);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const login = async ({ email, password }) => {
  try {
    const { data } = await api.post("/api/auth/login", {
      email,
      password,
    });

    alert(data.message);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const logout = async () => {
  try {
    const { data } = await api.post("/api/auth/logout");

    alert(data.message);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getMe = async () => {
  try {
    const { data } = await api.get("/api/auth/get-me");

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};