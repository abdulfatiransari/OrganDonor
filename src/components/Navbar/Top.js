import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { HashLink as Link } from "react-router-hash-link";
import "../About/About.css";

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
        <Navbar
            position="sticky"
            // fixed="top"
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
        </Navbar>
    );
};

export default Top;
