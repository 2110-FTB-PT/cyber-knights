import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { createReview } from "../axios-services";

export default function CreateReviewModal({
  show,
  onHide,
  user,
  token,
  setRerender,
  productId
}) {
  const [singleReview, setSingleReview] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { pathname } = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updateFields = {
      userId: user.id,
      productId,
      title,
      description,
      isPublic: true,
      token,
    };
    try {
      if (pathname === `/account`) {
        await createReview(updateFields);
        setTitle("");
        setDescription("");
        setRerender(true);
        onHide();
      } else {
        await createReview(updateFields);
        onHide();
      }
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
          <Modal.Title>Add Review</Modal.Title>
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
