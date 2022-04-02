import { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/Container";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdShoppingCart } from "react-icons/md";
import { LinkContainer } from "react-router-bootstrap";

export default function Header({ token, username, setToken, setUser }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      id="lg-nav"
      className="mw-100 d-sm-flex justify-content-between flex-md-row flex-sm-column"
      fixed="top"
    >
      <Container className="d-flex justify-content-start">
        <Button variant="secondary" className="ms-3 py-2" onClick={handleShow}>
          <GiHamburgerMenu size={30} />{" "}
        </Button>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header
            className="bg-dark text-light"
            closeButton
            closeVariant="white"
          >
            <Offcanvas.Title>PetRocks</Offcanvas.Title>
            {username ? (
              <Offcanvas.Title>Hello, {username}!</Offcanvas.Title>
            ) : (
              <Offcanvas.Title>Hello, Guest!</Offcanvas.Title>
            )}
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav>
              <ButtonGroup vertical>
                <LinkContainer to="/">
                  <Button
                    variant="outline-secondary"
                    className="btn-block p-4 fs-2"
                    onClick={handleClose}
                  >
                    Home
                  </Button>
                </LinkContainer>
                <LinkContainer to="/allProducts">
                  <Button
                    variant="outline-secondary"
                    className="btn-block p-4 fs-2"
                    onClick={handleClose}
                  >
                    All Products
                  </Button>
                </LinkContainer>
                <LinkContainer to="/products-pets">
                  <Button
                    variant="outline-secondary"
                    className="btn-block p-4 fs-2"
                    onClick={handleClose}
                  >
                    Just the pets!
                  </Button>
                </LinkContainer>
                <LinkContainer to="/products-accessories">
                  <Button
                    variant="outline-secondary"
                    className="btn-block p-4 fs-2"
                    onClick={handleClose}
                  >
                    Accessories
                  </Button>
                </LinkContainer>
                {token ? (
                  <>
                    <LinkContainer to="/account">
                      <Button
                        variant="outline-secondary"
                        className="btn-block p-4 fs-2"
                        onClick={handleClose}
                      >
                        My Account
                      </Button>
                    </LinkContainer>
                    <LinkContainer to="/">
                      <Button
                        variant="outline-secondary"
                        className="btn-block p-4 fs-2"
                        onClick={() => {
                          setToken("");
                          localStorage.removeItem("token");
                          setUser({});
                          handleClose();
                        }}
                      >
                        Logout
                      </Button>
                    </LinkContainer>
                  </>
                ) : (
                  <LinkContainer to="/login">
                    <Button
                      variant="outline-secondary"
                      className="btn-block p-4 fs-2"
                      onClick={handleClose}
                    >
                      Login
                    </Button>
                  </LinkContainer>
                )}
                <LinkContainer to="/cart">
                  <Button
                    variant="outline-secondary"
                    className="btn-block p-4 fs-2"
                    onClick={handleClose}
                  >
                    <MdShoppingCart />
                  </Button>
                </LinkContainer>
              </ButtonGroup>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
        <Navbar.Brand className="m-0  mx-3 fs-1">PetRocks</Navbar.Brand>
      </Container>
      <InputGroup className="w-25 mx-4">
        <FormControl
          placeholder="Search . . ."
          aria-label="Recipient's username"
          aria-describedby="search-btn"
        />
        <Button variant="secondary" id="search-btn">
          <FaSearch />
        </Button>
      </InputGroup>
    </Navbar>
  );
}
