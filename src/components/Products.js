import React from 'react'
import Card from "react-bootstrap/Card";
import { fetchProducts } from "../axios-services";
import { useNavigate } from "react-router-dom";
import ProductCards from './ProductCards';
import '../style/Products.css'

export default function Products({ products }) {
 console.log(products);
  return (
    <div>
    {/* <div className='products-ribbon'>SALE</div> */}
      {products.map((product) => {
          return (
            <React.Fragment key={product.id}>
              <ProductCards product={product} />
            </React.Fragment>
          )
        })}
    </div>
  )
}
