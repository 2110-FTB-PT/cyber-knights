import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import { updateReviewComment } from "../axios-services";


const EditCommentModal = ({ show, onHide, id, token, setRerender }) => {
  const [updatedComment, setUpdatedComment] = useState("");
  console.log("id", id);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateReviewComment({ id, comment: updatedComment, token });
      setUpdatedComment("");
      setRerender(true);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
            <FloatingLabel controlId="update-comment" label="New Comment Here">
              <Form.Control
                type="text"
                placeholder="New Comment Here"
                onChange={(event) => {
                  setUpdatedComment(event.target.value);
                }}
              ></Form.Control>
            </FloatingLabel>
            <Container className="d-flex gap-3">
              <Button variant="secondary" onClick={onHide} className="w-50">
                Close
              </Button>
              <Button
                variant="primary"
                onClick={onHide}
                type="submit"
                className="w-50"
              >
                Save Changes
              </Button>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default EditCommentModal;
