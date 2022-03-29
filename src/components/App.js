import React, { useState, useEffect } from "react";
import Header from "./Header";
import Products from "./Products";
import Home from "./Home";
import Login from "./Login";
import "../style/App.css";
import { Route, Routes } from "react-router-dom";
import { getUser, fetchProducts } from "../axios-services";
import SingleProduct from "./SingleProduct";

const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);

  const handleProducts = async () => {
    try {
      const products = await fetchProducts();
      setProducts(products);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleProducts();
  }, []);

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
      <div className="content-container d-flex justify-content-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/allProducts"
            element={<Products products={products} />}
          />
          <Route
            path="/single-product/:productId"
            element={<SingleProduct />}
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
          <Route path="/cart" element={<h1>cart</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
