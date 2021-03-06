import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import { fetchPublicReviews, updateReviewComment } from "../axios-services";

export default function MyComments({
  token,
  products,
  comments,
  setRerender,
  handleShow,
  setSpecificCommentId,
}) {
  const [allPublicReviews, setAllPublicReviews] = useState([]);

  useEffect(() => {
    fetchPublicReviews().then((res) => setAllPublicReviews(res));
  }, []);

  const handleDelete = async (commentId) => {
    const deleteComment = {
      id: commentId,
      isPublic: false,
      token,
    };
    try {
      setRerender(true);
      await updateReviewComment(deleteComment);
      setRerender(false);
    } catch (error) {
      console.error(error);
    }
  };

  const reviewInfo = (reviewId) => {
    const [singleReview] = allPublicReviews.filter(
      (review) => review.id === reviewId
    );
    return singleReview;
  };

  const productInfo = (reviewId) => {
    const [singleProduct] = products.filter(
      (product) => product.id === reviewInfo(reviewId).productId
    );
    return singleProduct.name;
  };

  const checkUserName = (username) => {
    const lastLetter = username.length - 1;
    if (username[lastLetter] === "s") return `'`;
    return `'s`;
  };

  return (
    <div className="comments-container w-50">
      <h5 className="text-center">My Comments</h5>
      <div className="d-flex flex-column gap-4">
        {comments &&
          comments.map(({ id, comment, reviewId }) => {
            return (
              <Card
                key={id}
                className="d-flex flex-column align-content-center"
              >
                <Card.Header className="bg-dark text-light fs-4">
                  <Card.Title>
                    {`Comment left on 
                    ${reviewInfo(reviewId).creatorName}${checkUserName(
                      reviewInfo(reviewId).creatorName
                    )} review about`}
                  </Card.Title>
                  <Card.Text>{`${productInfo(reviewId)}!`}</Card.Text>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{comment}</Card.Text>
                </Card.Body>
                <Container className="d-flex flex-column align-content-center gap-1 mb-3">
                  <ButtonGroup className="gap-2">
                    <Button
                      variant="secondary"
                      className="rounded"
                      onClick={() => {
                        setSpecificCommentId(id);
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
              </Card>
            );
          })}
      </div>
    </div>
  );
}
