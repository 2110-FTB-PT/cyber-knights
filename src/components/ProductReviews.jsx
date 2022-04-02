import React, { useEffect, useRef, useState } from "react";
import { fetchProductReviews } from "../axios-services";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import EditReviewsModal from "./EditReviewsModal";
import EditCommentModal from "./EditCommentModal";
import CreateReviewModal from "./CreateReviewModal";
import CreateCommentModal from "./CreateCommentModal";

export default function ProductRevies({ productId, user, token }) {
  const [singleProductReviews, setSingleProductReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [specificReviewId, setSpecificReviewId] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [specificCommentId, setSpecificCommentId] = useState(null);
  const [rerender, setRerender] = useState(false);
  const [showCreateReviewModal, setShowCreateReviewModal] = useState(false);
  const [showCreateCommentModal, setShowCreateCommentModal] = useState(false);
  console.log("showCreateReviewModal :>> ", showCreateReviewModal);

  const handleReviewShow = () => setShowReviewModal(true);
  const handleReviewClose = () => setShowReviewModal(false);
  const handleCommentShow = () => setShowCommentModal(true);
  const handleCommentClose = () => setShowCommentModal(false);
  const handleCreateReviewShow = () => setShowCreateReviewModal(true);
  const handleCreateReviewClose = () => setShowCreateReviewModal(false);
  const handleCreateCommentShow = () => setShowCreateCommentModal(true);
  const handleCreateCommentClose = () => setShowCreateCommentModal(false);

  useEffect(() => {
    const productReviews = async () => {
      const reviews = await fetchProductReviews(productId);
      setSingleProductReviews(reviews);
    };
    productReviews();
    setRerender(false);
  }, [
    rerender,
    showReviewModal,
    showCreateReviewModal,
    showCreateCommentModal,
  ]);

  return (
    <div>
      <h1>Reviews:</h1>
      <Button
        className="btn-block"
        variant="secondary"
        onClick={handleCreateReviewShow}
      >
        Add Review
      </Button>
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
                  {user.username === creatorName ? (
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setSpecificReviewId(id);
                        handleReviewShow();
                      }}
                    >
                      Edit Your Review
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setSpecificReviewId(id);
                        handleCreateCommentShow();
                      }}
                    >
                      Add Comment
                    </Button>
                  )}
                  {comments &&
                    comments.map(({ id, comment, creatorName }, i) => {
                      return (
                        <React.Fragment key={id}>
                          <Accordion>
                            <Accordion.Item eventKey={id}>
                              <Accordion.Header>
                                {user.username === creatorName
                                  ? `Your comment`
                                  : `Comment by ${creatorName}`}
                              </Accordion.Header>
                              <Accordion.Body className="d-flex flex-column gap-2">
                                {comment}
                                {user.username === creatorName && (
                                  <Button
                                    variant="secondary"
                                    className="align-self-end"
                                    onClick={() => {
                                      setSpecificCommentId(id);
                                      handleCommentShow();
                                    }}
                                  >
                                    Edit your comment
                                  </Button>
                                )}
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </React.Fragment>
                      );
                    })}
                </Card.Body>
              </Card>
            );
          }
        )}
      <EditCommentModal
        token={token}
        id={specificCommentId}
        show={showCommentModal}
        setRerender={setRerender}
        onHide={handleCommentClose}
      />
      <EditReviewsModal
        token={token}
        reviews={singleProductReviews}
        id={specificReviewId}
        show={showReviewModal}
        onHide={handleReviewClose}
      />
      <CreateReviewModal
        token={token}
        show={showCreateReviewModal}
        onHide={handleCreateReviewClose}
        user={user}
        productId={productId}
      />
      <CreateCommentModal
        token={token}
        show={showCreateCommentModal}
        onHide={handleCreateCommentClose}
        user={user}
        reviewId={specificReviewId}
        setRerender={setRerender}
      />
    </div>
  );
}
