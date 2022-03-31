import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import { updateReview } from "../axios-services";

export default function EditReviewsModal({
  token,
  reviews,
  show,
  id,
  setRerender,
  onHide,
}) {
  const [singleReview, setSingleReview] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  console.log("id", id);
  useEffect(() => {
    const handleSingleReview = () => {
      const [thisReview] = reviews.filter((review) => review.id === id);
      console.log("thisReview :>> ", thisReview);
      setTitle(thisReview?.title);
      setDescription(thisReview?.description);
      setSingleReview(thisReview);
    };
    handleSingleReview();
  }, [reviews, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updateFields = {
      id,
      title,
      description,
      token,
    };
    try {
      setRerender(true);
      await updateReview(updateFields);
      setRerender(false);
      onHide();
    } catch (error) {
      throw error;
    }
  };

  const onClickHandler = () => {
    onHide();
    setTitle(singleReview.title);
    setDescription(singleReview.description);
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
            <Form.Group controlId="control-review-title">
              <Form.Label>Title: </Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="control-text-area">
              <Form.Label>Description: </Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows={5}
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Container className="d-flex gap-3">
              <Button
                variant="secondary"
                onClick={onClickHandler}
                className="w-50"
              >
                Close
              </Button>
              <Button variant="primary" type="submit" className="w-50">
                Save Changes
              </Button>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
