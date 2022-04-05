import React from "react";
import ProductCards from "./ProductCards";
import "../style/Products.css";

export default function Products({ products, user, token }) {
  return (
    <div>
      <div className="primarycontent"></div>
      {!token ? (
        <div className="products-ribbon">Login to save items in cart!</div>
      ) : null}
      <div className="d-flex flex-wrap gap-4">
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
