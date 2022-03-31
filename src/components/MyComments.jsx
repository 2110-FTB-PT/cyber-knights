import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import { fetchPublicReviews, updateReviewComment } from "../axios-services";

export default function MyComments({
  token,
  comments,
  setRerender,
  handleShow,
  specificCommentId,
  setSpecificCommentId,
}) {
  const [allPublicReviews, setAllPublicReviews] = useState([]);

  useEffect(() => {
    fetchPublicReviews().then((res) => setAllPublicReviews(res));
  }, []);

  const handleDelete = async () => {
    const deleteComment = {
      id: specificCommentId,
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

  const addReviewTitleToComment = (reviewId) => {
    const [singleReview] = allPublicReviews.filter(
      (review) => review.id === reviewId
    );
    return singleReview?.title;
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
                  {addReviewTitleToComment(reviewId)}
                </Card.Header>
                <Card.Body>
                  <Card.Text>{comment}</Card.Text>
                </Card.Body>
                <Container className="d-flex flex-column align-content-center gap-1 mb-3">
                  <Button
                    variant="warning"
                    onClick={() => navigate(`./single-product/${productId}`)}
                  >
                    Check out the product!
                  </Button>
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
                        setSpecificCommentId(comment.id);
                        handleDelete();
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
