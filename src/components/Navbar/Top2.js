import React from "react";
import { Offcanvas } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { HashLink as Link } from "react-router-hash-link";

const Top2 = () => {
    return (
        <>
            {/* <Navbar position="sticky" fixed="top" className="navbar fixed" style={{ backgroundColor: "#00000080" }}>
                <Container className="trans">
                    <Nav className="me-auto trans">
                        <Link
                            to="/Donor_login"
                            className=" trans nav-link nav-link-ltr"
                            smooth
                            style={{ color: "white" }}
                        >
                            Donor Info
                        </Link>
                        <Link
                            to="/Donor_Register"
                            className=" trans nav-link nav-link-ltr"
                            smooth
                            style={{ color: "white" }}
                        >
                            Donor Register
                        </Link>
                        <Link to="/Hospital_login" className="trans nav-link nav-link-ltr" style={{ color: "white" }}>
                            Partner with us (for Hospitals)
                        </Link>
                    </Nav>
                    <Nav className="trans">
                        <Link to="/" className="button-70" href="#pricing">
                            {" "}
                            Go Back
                        </Link>
                    </Nav>
                </Container>
            </Navbar> */}

            {["lg"].map((expand) => (
                <Navbar key={expand} expand={expand} className="mb-3" style={{ backgroundColor: "#00000080" }}>
                    <Container fluid>
                        <Navbar.Brand
                            href="#courous"
                            className="trans nav-link nav-link-ltr head"
                            style={{ color: "white" }}
                        >
                            Organ-Chain
                        </Navbar.Brand>
                        <Navbar.Toggle
                            aria-controls={`offcanvasNavbar-expand-${expand}`}
                            style={{ background: "#808080" }}
                        />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            style={{ background: "#808080" }}
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title
                                    id={`offcanvasNavbarLabel-expand-${expand}`}
                                    className="trans nav-link nav-link-ltr head"
                                    style={{ color: "white" }}
                                >
                                    Organ-Chain
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav>
                                        <Link
                                            to="/Donor_login"
                                            className="trans nav-link nav-link-ltr"
                                            smooth
                                            style={{ color: "white" }}
                                        >
                                            Donor Info
                                        </Link>
                                    </Nav>
                                    <Nav>
                                        <Link
                                            to="/Donor_Register"
                                            className="trans nav-link nav-link-ltr"
                                            smooth
                                            style={{ color: "white" }}
                                        >
                                            Donor Register
                                        </Link>
                                    </Nav>
                                    <Nav>
                                        <Link
                                            to="/Hospital_login"
                                            className="trans nav-link nav-link-ltr"
                                            smooth
                                            style={{ color: "white" }}
                                        >
                                            Partner with us (for Hospitals)
                                        </Link>
                                    </Nav>
                                    <Nav>
                                        {" "}
                                        <Link to="/" className="button-70" smooth style={{ color: "white" }}>
                                            Go Back
                                        </Link>
                                    </Nav>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
};

export default Top2;
