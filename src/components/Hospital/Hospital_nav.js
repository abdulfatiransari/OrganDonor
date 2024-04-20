import "@fortawesome/fontawesome-svg-core";
import SideNav, { NavIcon, NavItem, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import React from "react";
import "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./main.css";
//import TransplantMatch from "./transplant-match";

function Hospital_nav() {
    const logout = (event) => {
        window.localStorage.removeItem("isAuthenticated");
        window.localStorage.removeItem("token");
        window.location = "/";
    };
    return (
        <>
            <SideNav>
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <NavLink to="/dashboard">
                                <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }}></i>
                            </NavLink>
                        </NavIcon>
                        <NavText>
                            <NavLink to="/dashboard">Home</NavLink>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="approve_donor">
                        <NavIcon>
                            <NavLink to="/dashboard/approvedonor">
                                <i className="fa fa-fw fa-check" style={{ fontSize: "1.75em" }} />
                            </NavLink>
                        </NavIcon>
                        <NavText>
                            <NavLink to="/dashboard/approvedonor">Approve_donor</NavLink>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="register_recipient">
                        <NavIcon>
                            <NavLink to="/dashboard/registerrecipient">
                                <i className="fa fa-fw fa-heart" style={{ fontSize: "1.75em" }} />
                            </NavLink>
                        </NavIcon>
                        <NavText>
                            <NavLink to="/dashboard/registerrecipient">Register Recipient</NavLink>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Transplant Match">
                        <NavIcon>
                            <NavLink to="/dashboard/transplantmatch">
                                <i className="fa fa-fw fa-key" style={{ fontSize: "1.75em" }} />
                            </NavLink>
                        </NavIcon>
                        <NavText>
                            <NavLink to="/dashboard/transplantmatch">Transplant Match</NavLink>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Logout">
                        <NavIcon>
                            <NavLink onClick={logout}>
                                <i className="fa fa-fw fa-sign-out" style={{ fontSize: "1.75em" }} onClick={logout} />
                            </NavLink>
                        </NavIcon>
                        <NavText>
                            <NavLink onClick={logout}>Logout </NavLink>
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </>
    );
}

export default Hospital_nav;
