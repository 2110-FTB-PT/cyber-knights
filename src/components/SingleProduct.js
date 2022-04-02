import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductReviews from "./ProductReviews";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import { fetchProductById } from "../axios-services";
import '../style/SingleProduct.css'
import EditProductModal from "./EditProductModal";

export default function SingleProduct({ user, token }) {
  const [product, setProduct] = useState([]);
  const [modalShow,setModalShow]=useState(false)
  const { productId } = useParams();
  const navigate = useNavigate();
  const [productModalShow, setProductModalShow] = useState(false);

  const handleProductShow=()=>setModalShow(true)
  const handleProductClose=()=>setModalShow(false)

  useEffect(() => {
    const singleProductHandler = async () => {
      try {
        const singleProduct = await fetchProductById(productId);
        setProduct(singleProduct);
      } catch (error) {
        console.error(error);
      }
    };
    singleProductHandler();
  }, []);

  return (
    <div className="d-flex flex-column mx-4">
      {user.admin?<div className="admin-banner ">ADMIN MODE<span><Button onClick={handleProductShow}>Edit Page</Button></span></div>:null}
      <div className="product-container mt-5  d-flex ">
    <div className="product-container mt-5  d-flex ">
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
    </div>
    <EditProductModal
      show={modalShow}
      onHide={handleProductClose}
      product={product}
      setProduct={setProduct}
      user={user}
    />
     <ProductReviews
        productId={productId}
        user={user}
        token={token}
      />
    </div>
  );
}
