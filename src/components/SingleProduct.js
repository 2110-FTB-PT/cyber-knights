import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductReviews from "./ProductReviews";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { fetchProductById, addItemToCart, getUser } from "../axios-services";
import "../style/SingleProduct.css";
import EditProductModal from "./EditProductModal";
import Logo from "./Logo";
import ProductRevies from "./ProductReviews";

export default function SingleProduct({ user, token, setUser }) {
  const [product, setProduct] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const { productId } = useParams();
  const navigate = useNavigate();

  const handleProductShow = () => setModalShow(true);
  const handleProductClose = () => setModalShow(false);

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
  }, [modalShow]);

  return (
<<<<<<< Updated upstream
    <div className="d-flex flex-column mx-4 w-100">
      {user.admin && (
=======
    <div className="d-flex flex-column mx-4">
      {user.admin ? (
>>>>>>> Stashed changes
        <div className="admin-banner ">
          ADMIN MODE
          <span>
            <Button onClick={handleProductShow}>Edit Page</Button>
          </span>
<<<<<<< Updated upstream
        </div>
      )}
      <div className="product-container mt-2 w-100 d-flex ">
        <div className="d-flex flex-row left-column justify-content-center">
          {product?.images && (
            <img
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
              }}
              className="main-image"
              src={product.images[0].url}
            />
          )}
        </div>
        <div className="center-column ">
          <h1>{product?.name}</h1>
          <h2>{product?.description}</h2>
        </div>
        <div className="right-column">
          <h3>${product?.price}</h3>
          <h2>IN STOCK</h2>
          <Button
            onClick={async () => {
              await getUser(token).then((res) => setUser(res));
              addItemToCart(user.id, product.id);
            }}
          >
            Add to Cart
          </Button>
        </div>
=======
        </div>
      ) : null}
      <div className="product-container mt-5  d-flex ">
        <div className="product-container mt-5  d-flex ">
          <div className="left-column">
            <div className="mapped-images"></div>
            <div className="IMAGEaa"></div>
          </div>
          <div className="center-column ">
            <h1>{product.name}</h1>
            <h2>{product.description}</h2>
          </div>
          <div className="right-column">
            <h3>${product.price}</h3>
            <h2>IN STOCK</h2>
            <Button
              onClick={async () => {
                await getUser(token).then((res) => setUser(res));
                addItemToCart(user.id, product.id);
              }}
            >
              Add to Cart
            </Button>
          </div>

          <div className="product-reviews"></div>
        </div>
>>>>>>> Stashed changes
      </div>
      <EditProductModal
        show={modalShow}
        onHide={handleProductClose}
        product={product}
        setProduct={setProduct}
        user={user}
      />
      <ProductReviews productId={productId} user={user} token={token} />
    </div>
  );
}
