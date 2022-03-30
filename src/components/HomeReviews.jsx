import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProductById, fetchPublicReviews } from "../axios-services";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function HomeReviews({ products }) {
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

  const productTitle = (productId) => {
    const [singleProduct] = products.filter(
      (product) => product.id === productId
    );
    return singleProduct.name;
  };

  return (
    <div className="d-flex flex-column w-50 gap-4">
      <h1>Some Reviews</h1>
      <div className="d-flex flex-column gap-2">
        {publicReviews &&
          rngReviews().map(({ id, creatorName, description, productId }) => {
            return (
              <Card key={id}>
                <Card.Header className="bg-dark text-light fs-4">
                  {productTitle(productId)}
                </Card.Header>
                <Card.Body>
                  <Card.Text>{description}</Card.Text>
                  <Card.Title className="blockquote-footer fs-6 text-end">
                    Author: {creatorName}
                  </Card.Title>
                  <Button
                    variant="warning"
                    onClick={() => navigate(`./single-product/${productId}`)}
                  >
                    Check out the product!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
