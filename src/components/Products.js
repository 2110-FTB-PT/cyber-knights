import React from "react";
import ProductCards from "./ProductCards";
import "../style/Products.css";

export default function Products({ products, user, token }) {
  return (
    <div>
      {!token?<div className="d-flex align-items-center products-ribbon justify-content-center"><h1>Login to save items in cart!</h1></div>:null}
      <div className="d-flex flex-wrap gap-4 justify-content-center mt-3" >
        {products.map((product) => {
          return (
            <React.Fragment key={product.id}>
              <ProductCards product={product} user={user} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
