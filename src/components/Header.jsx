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
import Logo from "./Logo";
import "../style/header.css";

export default function Header({ token, user, setToken, setUser }) {
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
      <Container className="d-flex justify-content-between mw-100">
        <Button variant="secondary" className="ms-3 py-2" onClick={handleShow}>
          <GiHamburgerMenu size={30} />{" "}
        </Button>
        <Offcanvas className="" show={show} onHide={handleClose}>
          <Offcanvas.Header
            className="bg-dark text-light"
            closeButton
            closeVariant="white"
          >
            <Offcanvas.Title>Build-a-Rock</Offcanvas.Title>
            {user.username ? (
              <Offcanvas.Title>Hello, {user.username}!</Offcanvas.Title>
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
                <LinkContainer to="/cart">
                  <Button
                    variant="outline-secondary"
                    className="btn-block p-4 fs-2"
                    onClick={handleClose}
                  >
                    Cart <MdShoppingCart />
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
              </ButtonGroup>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
        <Container className="d-flex justify-content-center align-items-center">
          <Navbar.Brand className="m-0  mx-3 fs-1">Build -</Navbar.Brand>
          <Logo />
          <Navbar.Brand className="m-0  mx-3 fs-1">- Rock</Navbar.Brand>
        </Container>
        <LinkContainer to="/cart">
          <Button
            variant="outline-secondary"
            className="btn-block p-2 fs-2 d-flex flex-column"
          >
            <span
              className="badge badge-warning w-75 align-self-end"
              id="lblCartCount"
            >
              {user?.cart?.length}
            </span>
            <MdShoppingCart />
          </Button>
        </LinkContainer>
      </Container>
    </Navbar>
  );
}
