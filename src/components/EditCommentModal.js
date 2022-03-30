import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { updateReviewComment } from "../axios-services";
import { useNavigate } from "react-router-dom";


const EditCommentModal = ({ show, onHide, comment }) => {
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      
      navigate("/");
    } catch (error) {
      throw error
    }
  }

    // useEffect(() => {
    //   if (comment) {
    //     setComment(comment);
    //   }
    //   const token = localStorage.getItem("token");
    //   if (token) {
    //     setToken(token);
    //   }
    // }, [comment]);

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <textarea
              type="text"
              placeholder="Type new comment here"
              cols="50"
              maxLength="500"
            ></textarea>
          </form>
          {/* Hi
          <Form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="update-comment"
                label="New Comment Here"
              >
                <Form.Control
                  type="text"
                  placeholder="New Comment Here"
                  onChange={(event) => {
                    setComments(event.target.value);
                  }}
                ></Form.Control>
              </FloatingLabel>
          </Form> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={onHide} onSubmit={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditCommentModal;
