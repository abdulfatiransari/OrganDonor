import "@fortawesome/fontawesome-svg-core";
import SideNav, { NavIcon, NavItem, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import React, { useContext, useState } from "react";
import "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./main.css";
import { AuthContext } from "../Context";
import Web3 from "web3";
//import TransplantMatch from "./transplant-match";

function Hospital_nav() {
    const [loading, setLoading] = useState(false);
    const { address, setAddress } = useContext(AuthContext);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Wallet Address copied!");
    };

    const onPressConnect = async () => {
        setLoading(true);
        try {
            if (window?.ethereum) {
                // Desktop browser
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });

                const account = Web3.utils.toChecksumAddress(accounts[0]);
                setAddress(account);
            }
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    const onPressLogout = () => setAddress("");

    const logout = (event) => {
        onPressLogout();
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
                    <NavItem eventKey="Hospital List">
                        <NavIcon>
                            <NavLink to="/dashboard/hospitallist">
                                <i className="fa fa-hospital-o" style={{ fontSize: "1.75em" }} />
                            </NavLink>
                        </NavIcon>
                        <NavText>
                            <NavLink to="/dashboard/hospitallist">Hospital List</NavLink>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Donor List">
                        <NavIcon>
                            <NavLink to="/dashboard/donorlist">
                                <i className="fa fa-user" style={{ fontSize: "1.75em" }} />
                            </NavLink>
                        </NavIcon>
                        <NavText>
                            <NavLink to="/dashboard/donorlist">Donor List</NavLink>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Needy List">
                        <NavIcon>
                            <NavLink to="/dashboard/needylist">
                                <i className="fa fa-user" style={{ fontSize: "1.75em" }} />
                            </NavLink>
                        </NavIcon>
                        <NavText>
                            <NavLink to="/dashboard/needylist">Needy List</NavLink>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="predict">
                        <NavIcon>
                            <NavLink to="/dashboard/predict">
                                <i className="fa fa-fw fa-check" style={{ fontSize: "1.75em" }} />
                            </NavLink>
                        </NavIcon>
                        <NavText>
                            <NavLink to="/dashboard/predict">Predict</NavLink>
                        </NavText>
                    </NavItem>
                    {/* <NavItem eventKey="register_recipient">
                        <NavIcon>
                            <NavLink to="/dashboard/registerrecipient">
                                <i className="fa fa-fw fa-heart" style={{ fontSize: "1.75em" }} />
                            </NavLink>
                        </NavIcon>
                        <NavText>
                            <NavLink to="/dashboard/registerrecipient">Register Recipient</NavLink>
                        </NavText>
                    </NavItem> */}
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
                    <NavItem onClick={onPressConnect}>
                        <NavIcon>
                            <NavLink to="#">
                                <i className="fa fa-unlock-alt" style={{ fontSize: "1.75em" }} />
                            </NavLink>
                        </NavIcon>
                        <NavText>
                            <NavLink to="#">{address ? "Connected" : "Connect Wallet"}</NavLink>
                        </NavText>
                    </NavItem>
                    {address && (
                        <NavItem onClick={() => copyToClipboard(address)}>
                            <NavIcon>
                                <NavLink to="#">
                                    <i className="fa fa-fw fa-copy" style={{ fontSize: "1.75em" }} />
                                </NavLink>
                            </NavIcon>
                            <NavText>
                                <NavLink to="#">{`${address.slice(0, 8)}..${address.slice(
                                    address.length - 8,
                                    address.length
                                )}`}</NavLink>
                            </NavText>
                        </NavItem>
                    )}
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
