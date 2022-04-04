import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { editProducts, fetchProductById } from "../axios-services";

export default function EditProductModal({
  show,
  onHide,
  product: {
    name: productName,
    price: productPrice,
    description: productDescription,
    id,
  },
  setProduct,
  user,
  token,
}) {
  //toggle state
  //useEffect
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescripton] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updateProductObj = { name, description, price, isPublic };
    try {
      await editProducts(id, token, updateProductObj);
      const updatedProduct = await fetchProductById(id);
      setProduct(updatedProduct);
      onHide();
    } catch (err) {
      //errorhandling goes here
      console.error(err);
    }
  };

  useEffect(() => {
    setName(productName);
    setDescripton(productDescription);
    setPrice(productPrice);
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="edit-modal "
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <Form.Control
            type="text"
            defaultValue={productName}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className="d-flex flex-column "
          onSubmit={(e) => submitHandler(e)}
        >
          <Form.Group id="modal-size">
            <Form.Label>New Price</Form.Label>
            <Form.Control
              type="number"
              defaultValue={productPrice}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>New Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              type="text"
              defaultValue={productDescription}
              onChange={(e) => setDescripton(e.target.value)}
            />
          </Form.Group>
          <Container>
            <Button type="submit" onClick={submitHandler}>
              Update product
            </Button>
            <Button type="submit" onClick={onHide}>
              Close
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
