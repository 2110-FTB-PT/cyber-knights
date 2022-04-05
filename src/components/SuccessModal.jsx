import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { FaHandHoldingHeart } from "react-icons/fa";
export default function SuccessModal({ show, onHide }) {
  return (
    <Modal size="lg" show={show} onHide={onHide}>
      <Alert variant="success" className="m-0 d-flex flex-column">
        <Alert.Heading>Hey, we appreciate YOU!</Alert.Heading>
        <p>
          Our purpose at Build-A-Rock is simple: to put a heart in a cuddly
          buddy that evokes warm memories of childhood, friendship, trust, and
          love. Our objective has been the same since the beginning: to make the
          world a happier place.
        </p>
        <hr />
        <p className="mb-0">
          We hope you'll return in the future to buy more buddies!
        </p>
        <Button variant="success" onClick={onHide} className="align-self-end">
          Thank you come back soon! <FaHandHoldingHeart />
        </Button>
      </Alert>
    </Modal>
  );
}
