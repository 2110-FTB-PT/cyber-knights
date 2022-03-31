import axios from "axios";
const BASE_URL = "https://build-a-rock.herokuapp.com/api";


export const fetchProducts = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/products/public`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProductById = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/products/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (username, password) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/login`, {
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
  try {
    const { data } = await axios.post(`${BASE_URL}/users/register`, {
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
    const { data } = await axios.get(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    return data;
  } catch ({ response }) {
    console.error({ response });
  }
};

export const fetchUserComments = async (token) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/comments/myComments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch ({ response }) {
    console.error("response", response);
    // throw error;
  }
};

export const fetchUserReviews = async (token) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/reviews/myReviews`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateReviewComment = async ({
  id: commentId,
  token,
  ...commentFields
}) => {
  console.log("commentFields :>> ", commentFields);
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/comments/${commentId}`,
      commentFields,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch ({response}) {
    console.log("response", response.data);
    throw response;
  }
};

export const fetchPublicReviews = async () => {
  const { data } = await axios.get(`${BASE_URL}/reviews/`);
  return data;
};
