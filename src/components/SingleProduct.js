import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { fetchProductById } from "../axios-services";
import Button from "react-bootstrap/Button";
import '../style/SingleProduct.css'

export default function SingleProduct() {
  const [product, setProduct] = useState([]);
  const { productId } = useParams();

  const singleProductHandler = async () => {
    try {
      const singleProduct = await fetchProductById(productId);
      setProduct(singleProduct);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    singleProductHandler();
  }, []);

  return (
    <div className="product-container mt-5">
      <div className="left-column">
      
        
        <div className="IMAGEaa"></div>
      </div>
      <div className="center-column"></div>
      <div className="right-column">
        <h3>${product.price}</h3>
        <Button>Add to Cart</Button>
      </div>

      <div className="product-reviews"></div>
    </div>
  );
}
