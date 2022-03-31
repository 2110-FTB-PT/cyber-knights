import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useNavigate } from "react-router-dom";
import { updateReview } from "../axios-services";

export default function MyReviews({
  token,
  reviews,
  products,
  setRerender,
  setSpecificReviewId,
  handleShow,
}) {
  const navigate = useNavigate();
  const handleDelete = async (reviewId) => {
    const deleteReview = {
      id: reviewId,
      isPublic: false,
      token,
    };

    try {
      await updateReview(deleteReview);
      setRerender(true);
    } catch (error) {
      console.error(error);
    }
  };

  const productTitle = (productId) => {
    const [singleProduct] = products.filter(
      (product) => product.id === productId
    );

    return singleProduct?.name;
  };

  return (
    <div className="comments-container w-50">
      <h5 className="text-center">My Reviews</h5>
      <div className="d-flex flex-column gap-4">
        {reviews &&
          reviews.map(({ id, productId, description, creatorName, title }) => {
            return (
              <Card key={id}>
                <Card.Header className="bg-dark text-light fs-4">
                  {productTitle(productId)}
                </Card.Header>
                <Card.Body>
                  <Card.Text className="fs-5 fst-italic">{title}</Card.Text>
                  <Card.Text>{description}</Card.Text>
                  <Card.Title className="blockquote-footer fs-6 text-end">
                    Author: {creatorName}
                  </Card.Title>
                  <Container className="d-flex flex-column align-content-center gap-1">
                    <Button
                      variant="warning"
                      onClick={() => navigate(`./single-product/${productId}`)}
                    >
                      Check out the product!
                    </Button>
                    <ButtonGroup className="gap-2 ">
                      <Button
                        variant="secondary"
                        className="rounded"
                        onClick={() => {
                          setSpecificReviewId(id);
                          setRerender(true);
                          handleShow();
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="rounded"
                        onClick={() => {
                          handleDelete(id);
                        }}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </Container>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
