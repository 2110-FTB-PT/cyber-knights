import axios from "axios";
<<<<<<< Updated upstream
const BASE_URL = "https://build-a-rock.herokuapp.com/api";

=======
// const BASE_URL = "https://build-a-rock.herokuapp.com/api";
const BASE_URL = "http://localhost:3000/api";
>>>>>>> Stashed changes

export const fetchProducts = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/products/public`);
    return data;
  } catch ({ response }) {
    console.error(response.data);
  }
};

export const fetchProductById = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/products/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

<<<<<<< Updated upstream
export const editProducts = async(id,token,productObj) => {
  try {
    await axios.patch(`${BASE_URL}/products/${id}`,productObj,{
      headers:{
        Authorization: `Bearer ${token}`,
      },
    })
  } catch ({response}) {
    console.error(response.data)
     
=======
export const editProducts = async (id, productObj) => {
  try {
    await axios.patch(`${BASE_URL}"/products/${id}`, productObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.error(err);
>>>>>>> Stashed changes
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
  } catch ({ response }) {
    console.log("response", response.data);
    throw response;
  }
};

export const updateReview = async ({
  id: reviewId,
  token,
  ...reviewFields
}) => {
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/reviews/${reviewId}`,
      reviewFields,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch ({ response }) {
    console.log("response", response.data);
    throw response;
  }
};

export const fetchPublicReviews = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/reviews/`);
    return data;
  } catch ({ response }) {
    console.error(response.data);
  }
};

export const fetchProductReviews = async (productId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/reviews/${productId}`);
    return data;
  } catch ({ response }) {
    console.error(response.data);
  }
};

export const createReview = async ({ token, ...reviewFields }) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/reviews/create`,
      reviewFields,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch ({ response }) {
    console.error(response.data);
  }
};

export const createComment = async ({ token, ...commentFields }) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/comments/create`,
      commentFields,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch ({ response }) {
    console.error(response.data);
  }
};

export const addItemToCart = async (userId, productId) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/cart/create`, {
      userId,
      productId,
    });

    return data;
  } catch (err) {
    throw err;
  }
};

export const removeItemFromCart = async (cartId) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}/cart/delete`, { cartId });
    return data;
  } catch (err) {
    throw err;
  }
};
