import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { HashLink as Link } from "react-router-hash-link";
import "../About/About.css";
import { Offcanvas } from "react-bootstrap";

const Top = () => {
    const [fix, setfix] = useState(false);

    function setfixed() {
        if (window.scrollY >= 100) {
            setfix(true);
        } else {
            setfix(false);
        }
    }
    window.addEventListener("scroll", setfixed);

    return (
        <>
            {/* <Navbar
                position="sticky"
                className={fix ? "navbar fixed" : "navbar initial"}
                style={{ backgroundColor: "#00000080" }}
            >
                <Container className="trans">
                    <Link to="#courous" className="trans nav-link nav-link-ltr head" smooth style={{ color: "white" }}>
                        Organ-Chain
                    </Link>
                    <Nav className="me-auto trans">
                        <Link to="#about" className="trans nav-link nav-link-ltr" smooth style={{ color: "white" }}>
                            About Us
                        </Link>
                        <Link to="#success" className="trans nav-link nav-link-ltr" smooth style={{ color: "white" }}>
                            Success Stories
                        </Link>
                        <Link to="#partner" className="trans nav-link nav-link-ltr" style={{ color: "white" }}>
                            Partner with us
                        </Link>
                    </Nav>
                    <Nav className="trans">
                        <Link to="/Donor_login" className="button-70" href="#pricing">
                            {" "}
                            Login/Signup
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
                                    <Nav.Link
                                        href="#about"
                                        className="trans nav-link nav-link-ltr"
                                        smooth
                                        style={{ color: "white" }}
                                    >
                                        About Us
                                    </Nav.Link>
                                    <Nav.Link
                                        href="#success"
                                        className="trans nav-link nav-link-ltr"
                                        smooth
                                        style={{ color: "white" }}
                                    >
                                        Success Stories
                                    </Nav.Link>
                                    <Nav.Link
                                        href="#partner"
                                        className="trans nav-link nav-link-ltr"
                                        smooth
                                        style={{ color: "white" }}
                                    >
                                        Partner with us
                                    </Nav.Link>
                                    <Nav>
                                        <Link to="/Donor_login" className="button-70" smooth style={{ color: "white" }}>
                                            Login/Signup
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

export default Top;
