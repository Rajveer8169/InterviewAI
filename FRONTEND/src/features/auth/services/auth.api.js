import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true
});

export const register = async ({ username, email, password }) => {
  try {
    const { data } = await api.post(
      "/api/auth/register",
      {
        username,
        email,
        password,
      }
    );
    alert(data.message);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const login = async ({ email, password }) => {
  try {
    const { data } = await api.post(
      "/api/auth/login",
      { email, password }
    );
    alert(data.message);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  try {
    const { data } = await api.post("/api/auth/logout");
    alert(data.message);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getMe = async () => {
  try {
    const { data } = await api.get("/api/auth/get-me");
    return data;
  } catch (err) {
    console.log(err);
  }
};
