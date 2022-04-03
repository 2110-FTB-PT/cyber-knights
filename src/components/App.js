import React, { useState, useEffect } from "react";
import Header from "./Header";
import Products from "./Products";
import Home from "./Home";
import Login from "./Login";
import MyAccount from "./MyAccount";
import "../style/App.css";
import { Route, Routes } from "react-router-dom";
import { getUser, fetchProducts } from "../axios-services";
import SingleProduct from "./SingleProduct";
import ShoppingCart from "./ShoppingCart";

const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleUser = async () => {
      if (token) {
        const userInfo = await getUser(token);
        console.log("userInfo :>> ", userInfo);
        setUser(userInfo);
      }
    };

    handleUser();
  }, [token]);

  useEffect(() => {
    const handleProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error(error);
      }
    };

    handleProducts();

    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <div className="app-container">
      <Header
        username={user && user.username}
        token={token}
        setToken={setToken}
        setUser={setUser}
      />
      <div className="content-container d-flex justify-content-center mb-5">
        <Routes>
          <Route path="/" element={<Home products={products} />} />

          <Route
            path="/allProducts"
            element={<Products products={products} token={token} user={user} />}
          />
          <Route
            path="/single-product/:productId"
            element={<SingleProduct user={user} token={token} />}
          />

          <Route path="/products-pets" element={<h1>products-pets</h1>} />
          <Route
            path="/products-accessories"
            element={<h1>products-accessories</h1>}
          />
          <Route
            path="/login"
            element={<Login setToken={setToken} setUser={setUser} />}
          />
          <Route
            path="/account"
            element={
              <MyAccount products={products} token={token} user={user} />
            }
          />
          <Route path="/cart" element={<ShoppingCart user={user} products={products}/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
