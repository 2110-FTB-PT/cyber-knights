import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";

export default function HomeCarousel({ products }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("products useEffect", products);
  }, [products]);

  const rngProducts = () => {
    const stack = {};
    if (products) {
      let count = 0;
      while (count < 4 && products.length > 0) {
        console.log("stack :>> ", stack);
        const rIndex = Math.floor(Math.random() * products.length);
        if (stack.hasOwnProperty(rIndex)) continue;
        stack[rIndex] = products[rIndex];
        count += 1;
      }
    }
    return Object.values(stack);
  };

  return (
    <div className="d-flex flex-column text-center w-75">
      <h1>Hot Products!</h1>
      <Carousel variant="dark" slide={true} className="w-100 ms-2 p-4">
        {products &&
          rngProducts().map((product) => {
            return (
              <Carousel.Item
                key={[product.id]}
                interval={5000}
                alt={product.name}
              >
                <Card>
                  <Card.Img variant="top" src={product.images[0].url} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>{`$${product.price}`}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/single-product/${product.id}`)}
                    >
                      See Details
                    </Button>
                  </Card.Body>
                </Card>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </div>
  );
}
