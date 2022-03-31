import { useEffect, useState } from "react";
import { fetchProductReviews } from "../axios-services";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

export default function ProductRevies({ productId }) {
  const [singleProductReviews, setSingleProductReviews] = useState([]);

  useEffect(() => {
    const productReviews = async () => {
      const reviews = await fetchProductReviews(productId);
      setSingleProductReviews(reviews);
    };
    productReviews();
    console.log("singleProductReviews", singleProductReviews);
  }, []);

  return (
    <div>
      <h1>Reviews:</h1>
      {singleProductReviews &&
        singleProductReviews.map(
          ({ id, title, comments, description, creatorName }) => {
            return (
              <Card key={id}>
                <Card.Header className="bg-dark text-light fs-4">
                  <Card.Title className="fs-4 fst-italic">{title}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{description}</Card.Text>
                  <Card.Title className="blockquote-footer fs-6 text-end">
                    Author: {creatorName}
                  </Card.Title>
                  {comments &&
                    comments.map((comment, i) => {
                      return (
                        <Accordion key={comment.id}>
                          <Accordion.Item eventKey={i}>
                            <Accordion.Header>
                              Comment from {comment.creatorName}
                            </Accordion.Header>
                            <Accordion.Body>{comment.comment}</Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      );
                    })}
                </Card.Body>
              </Card>
            );
          }
        )}
    </div>
  );
}
