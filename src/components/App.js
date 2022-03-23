import React from "react";
import Header from "./Header";
import Home from "./Home";
import "../style/App.css";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="content-container d-flex justify-content-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allProducts" element={<h1>products</h1>} />
          <Route path="/products-pets" element={<h1>products-pets</h1>} />
          <Route
            path="/products-accessories"
            element={<h1>products-accessories</h1>}
          />
          <Route path="/login" element={<h1>login</h1>} />
          <Route path="/cart" element={<h1>cart</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
