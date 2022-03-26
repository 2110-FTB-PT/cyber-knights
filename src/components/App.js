import { React, useState, useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import "../style/App.css";
import { Route, Routes } from "react-router-dom";
import { getUser } from "../axios-services";

const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  console.log("user", user);

  useEffect(() => {
    const handleUser = async () => {
      if (token) {
        const userInfo = await getUser(token);
        console.log('userInfo :>> ', userInfo);
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
      <Header username={user && user.username} token={token} setToken={setToken} setUser={setUser}/>
      <div className="content-container d-flex justify-content-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allProducts" element={<h1>products</h1>} />
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
