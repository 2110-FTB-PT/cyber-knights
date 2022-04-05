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
  const [previousCart, setPreviousCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleUser = async () => {
      if (token) {
        const userInfo = await getUser(token);
        setUser(userInfo);
      }
    };

    const handleUserCart = async () => {
      const userInfo = await getUser(token);
      if (previousCart?.length !== userInfo?.cart?.length) {
        setPreviousCart(userInfo.cart);
        setUser(userInfo);
      }
    };

    if (!user?.username) handleUser();
    if (user?.id) handleUserCart();
  }, [token, user]);

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
    <div className="app-container bg-light">
      <Header user={user} token={token} setToken={setToken} setUser={setUser} />
      <div className="content-container d-flex justify-content-center mb-5">
        <Routes>
          <Route path="/" element={<Home products={products} />} />

          <Route
            path="/allProducts"
            element={<Products products={products} token={token} user={user} />}
          />
          <Route
            path="/single-product/:productId"
            element={
              <SingleProduct user={user} setUser={setUser} token={token} />
            }
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
          <Route
            path="/cart"
            element={
              <ShoppingCart
                user={user}
                token={token}
                setUser={setUser}
                products={products}
                setPreviousCart={setPreviousCart}
                previousCart={previousCart}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
