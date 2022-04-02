import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function ShoppingCart({ user, products }) {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column w-100  ">
      <div className="d-flex top-content justify-content-center">
        <Button onClick={() => navigate("/AllProducts")}>
          Continue Shopping
        </Button>
      </div>
      <div className="main-content d-flex flex-row ">
        <div className="left-column w-75">
        //product map will go in here
        </div>
        <div className="right-column">
          <h3>PRICE TOTAL</h3>
        </div>
      </div>
    </div>
  );
}
