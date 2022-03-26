import axios from "axios";
const BASE_URL = "https://build-a-rock.herokuapp.com/api";
const TEST_URL = "http://localhost:4000/api"


export const fetchProducts = async () => {
  try {
    const {data} = await axios.get(`${BASE_URL}/products/public`);
    return data
  } catch (error) {
    console.error(error)
  }
};


