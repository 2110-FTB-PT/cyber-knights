import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { getUser, removeItemFromCart } from "../axios-services";

export default function ShoppingCart({
  user: { cart },
  token,
  setPreviousCart,
  previousCart,
  setUser,
}) {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleUserCart = async () => {
      const userInfo = await getUser(token);
      if (previousCart?.length !== userInfo?.cart?.length) {
        setPreviousCart(userInfo.cart);
        setUser(userInfo);
      }
    };
    handleUserCart();
    handleTotal();
  }, [previousCart]);

  const handleTotal = () => {
    const sumArray = [];
    cart?.forEach((cartItem) => sumArray.push(cartItem.price));
    const reducer = (a, b) => a + b;
    const handlePrice = sumArray.reduce(reducer, 0);
    setTotal(handlePrice);
  };

  return (
    <div className="d-flex flex-column">
      <h1 className="text-center">Your Cart Item</h1>
      <div className="d-flex">
        <div className="product-info d-flex flex-column mx-3 w-75">
          {cart &&
            cart?.map((cartItem) => {
              return (
                <Card
                  className="d-flex  gap-2 my-2 shadow-lg"
                  key={cartItem.cartId}
                >
                  <Card.Body className="d-flex ">
                    <Card.Img
                      src={cartItem.url}
                      className="mx-4"
                      style={{ maxWidth: "150px", maxHeight: "150px" }}
                    />
                    <Card.Title>{cartItem.name}</Card.Title>
                    <Card.Text>{cartItem.description}</Card.Text>
                    <Card.Text>{`Price: $${cartItem.price}`}</Card.Text>
                    <Button
                      onClick={async () =>
                        await removeItemFromCart(cartItem.cartId)
                      }
                    >
                      Remove from Cart
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
        </div>
        <div className="d-flex flex-column product-total w-25 text-center">
          <h2>{`Your Total: $${total}`}</h2>
          <Container className="d-flex flex-column gap-2 h-100 align-justify-center">
            <Button variant="success">Purchase</Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/allProducts")}
            >
              Continue Shopping
            </Button>
          </Container>
        </div>
      </div>
    </div>
  );
}
