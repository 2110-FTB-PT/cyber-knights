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
          rngProducts().map(({ id, name, images, description, price }) => {
            return (
              <Carousel.Item key={[id]} interval={5000} alt={name}>
                <Card className="d-flex align-items-center flex-column">
                  <Card.Img
                    variant="top"
                    src={images[0].url}
                    style={{
                      display: "block",
                      maxWidth: "900px",
                      maxHeight: "600px",
                      minWidth: "900px",
                      minHeight: "600px",
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/single-product/${id}`)}
                    >
                      Click to see price!
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
