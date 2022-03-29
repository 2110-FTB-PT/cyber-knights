import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPublicReviews } from "../axios-services";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function HomeReviews() {
  const navigate = useNavigate();
  const [publicReviews, setPublicReviews] = useState([]);

  useEffect(() => {
    fetchPublicReviews().then((reviewsArray) => setPublicReviews(reviewsArray));
    console.log("publicReviews useEffect :>> ", publicReviews);
  }, []);

  const rngReviews = () => {
    const stack = {};
    if (publicReviews) {
      let count = 0;
      while (count < 4 && publicReviews.length > 0) {
        const rIndex = Math.floor(Math.random() * publicReviews.length);
        if (stack.hasOwnProperty(rIndex)) continue;
        stack[rIndex] = publicReviews[rIndex];
        count += 1;
      }
    }
    return Object.values(stack);
  };
  return (
    <div className="d-flex flex-column w-50">
      <h1>Some Reviews</h1>
      {publicReviews &&
        rngReviews().map(
          ({ id, title, creatorName, description, productId }) => {
            return (
              <Card key={id}>
                <Card.Header>{title}</Card.Header>
                <Card.Body>
                  <Card.Title>{creatorName}</Card.Title>
                  <Card.Text>{description}</Card.Text>
                  <Button
                    variant="secondary"
                    onClick={() => navigate(`./single-product/${productId}`)}
                  >
                    Check out the product!
                  </Button>
                </Card.Body>
              </Card>
            );
          }
        )}
    </div>
  );
}
