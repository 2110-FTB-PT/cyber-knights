import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { fetchProductById } from "../axios-services";
import Button from "react-bootstrap/Button";
import '../style/SingleProduct.css'


export default function SingleProduct({user}) {
  const [product, setProduct] = useState([]);
  const { productId } = useParams();
  const navigate = useNavigate()
  const [productModalShow,setProductModalShow]= useState(false)

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
    <div className="product-container mt-5  d-flex ">
      {user.admin?<div>sdas</div>:null}
      <div className="left-column">
        <div className='mapped-images'></div>
        
        <div className="IMAGEaa"></div>
      </div>
      <div className="center-column ">
        <h1>{product.name}</h1>
        <h2>{product.description}</h2>
      </div>
      <div className="right-column">
        <h3>${product.price}</h3>
        <h2>IN STOCK</h2>
        <Button>Add to Cart</Button>
      </div>

      <div className="product-reviews"></div>
    </div>
    //COMMENT COMPONENT WILL GO HERE
  );
}
