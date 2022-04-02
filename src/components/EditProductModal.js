import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import { editProducts } from "../axios-services";

export default function EditProductModal({
  show,
  onHide,
  product,
  setProduct,
  user,
}) {
  const [name,setName]=useState('')
  const [price,setPrice]=useState('')
  const [description,setDescripton]=useState('')

  const submitHandler = async (e) => {
    e.preventDefault();
    const updateProductObj = { name, description, price, isPublic };
    try {
      await editProducts(updateProductObj);
    } catch (err) {
      //errorhandling goes here
      console.error(err);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        <Modal.Body>
          <Form></Form>
        </Modal.Body>
      </Modal.Header>
    </Modal>
  );
}
