import axios from "axios";
const DATABASE_URL = "https://build-a-rock.herokuapp.com/api";

export const login = async (username, password) => {
  try {
    const { data } = await axios.post(`${DATABASE_URL}/users/login`, {
      username,
      password,
    });
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    throw error;
  }
};

export const register = async (username, password) => {
  try{
    const { data } = await axios.post(`${DATABASE_URL}/users/register`, {
    username,
    password,
  });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (token) => {
  try {
    const { data } = await axios.get(`${DATABASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data)
    return data;
  } catch (error) {
    throw error;
  }
};
