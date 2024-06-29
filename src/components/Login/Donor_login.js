import React, { useContext, useState } from "react";
import Top2 from "../Navbar/Top2";
import "./styles.css";
import "react-bootstrap";
import "./card.css";
import { Link, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import TokenABI from "../../ethereum/abi.json";
import { AuthContext } from "../Context";
import { signInWithEmailAndPassword } from "firebase/auth";
import getUser from "../../api/getUser";
import { auth } from "../../utils/firebase";

const DonorLogin = () => {
    const { setCurrentUser } = useContext(AuthContext);
    const [publicKey, setPublicKey] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [donorDetails, setDonorDetails] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();

        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const tokenContract = new ethers.Contract("0xa7a377343Ded512c623C905998604537653743a4", TokenABI, signer);

            try {
                const result = await tokenContract.getDonor(publicKey);
                setDonorDetails(result);
                console.log("🚀 ~ onSubmit ~ result:", result);
                console.log("start donor login");
            } catch {
                setErrMsg("bad request");
            }
        } else {
            alert("Please install MetaMask to use this dApp");
        }
    };

    const handleChange = (event) => {
        setPublicKey(event.target.value);
    };

    const onSubmit1 = (event) => {
        event.preventDefault();
        setErrMsg("");

        const user = { email, password };

        signInWithEmailAndPassword(auth, user.email, user.password)
            .then(async ({ user }) => {
                const firebaseuser = await getUser(user.uid);
                if (firebaseuser) {
                    setCurrentUser({
                        ...firebaseuser.data(),
                        id: firebaseuser.id,
                    });
                    console.log({ ...firebaseuser.data(), id: firebaseuser.id });
                    console.log("success");
                    navigate("/dashboard");
                }
            })
            .catch((err) => setErrMsg(err.message));
    };

    const onChange = (event) => {
        if (event.target.name === "email") {
            setEmail(event.target.value);
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
        }
    };

    return (
        <>
            <div style={{ background: "#000000", minHeight: "100vh" }}>
                <Top2 />
                <section className="hospital_login">
                    <div
                        className="px-4 py-5 px-md-5 text-center text-lg-start"
                        // style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
                    >
                        <div className="container">
                            <div className="row gx-lg-5 align-items-center">
                                <div className="col-lg-6 mb-5 mb-lg-0">
                                    <h1 className="my-5 display-3 fw-bold ls-tight">
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span className="text-primary">Check Donor Info and Status</span>
                                    </h1>
                                    <p style={{ color: "hsl(219, 10%, 50.8%)", fontSize: "15px" }}>
                                        “I never used to pay that much attention to organ donation, but I’m tremendously
                                        glad for it: it turned out that I was one of the ones in need. I hope my donor’s
                                        family will be blessed a thousand times for their sacrifice.” –Karl Black
                                    </p>
                                </div>

                                <div className="col-lg-6 mb-5 mb-lg-0">
                                    <div className="card">
                                        <div className="card-body py-5 px-md-5">
                                            <form onSubmit={onSubmit1} error={!!errMsg}>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        className="form-control"
                                                        value={email}
                                                        onChange={onChange}
                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="email">
                                                        Email
                                                    </label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        className="form-control"
                                                        value={password}
                                                        onChange={onChange}
                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="form3Example4">
                                                        Password
                                                    </label>
                                                </div>
                                                <p style={{ color: "black" }}>
                                                    Already have an account? <Link to="/donorregister"> Signup</Link>
                                                </p>

                                                <button type="submit" className="btn btn-primary btn-block mb-4">
                                                    Login
                                                </button>
                                            </form>
                                            <form onSubmit={onSubmit}>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="string"
                                                        id="public_key"
                                                        name="public_key"
                                                        className="form-control"
                                                        value={publicKey}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="public_key">
                                                        Public Key
                                                    </label>
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-block mb-4">
                                                    Check
                                                </button>
                                                {/* <div>
                                                    <p>
                                                        Don't have an account? <Link to="/donorregister">Signup</Link>{" "}
                                                    </p>
                                                </div> */}
                                                {errMsg && <h3 className="error"> {errMsg} </h3>}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {donorDetails && donorDetails.length >= 1 ? (
                    <div
                        className="alert alert col-md donor_id"
                        style={{ marginLeft: "40px", marginRight: "20px" }}
                        role="alert"
                    >
                        <h4
                            className="alert-heading"
                            style={{ textAlign: "center", fontSize: "3em", color: "#2c3e50" }}
                        >
                            Donor Information{" "}
                        </h4>
                        <div className="card " style={{ maxWidth: "500px", marginLeft: "25vw" }}>
                            <div className="card-body">
                                <h3 className="card-subtitle mb-2 text-muted" style={{ color: "#34495e" }}>
                                    Name: {donorDetails[0]}
                                </h3>
                                <h3 className="card-subtitle mb-2 text-muted" style={{ color: "#34495e" }}>
                                    Organ Needed: {donorDetails[1]}
                                </h3>
                                <h3 className="card-subtitle mb-2 text-muted" style={{ color: "#34495e" }}>
                                    Blood Group: {donorDetails[2]}
                                </h3>
                                <h3 className="card-subtitle mb-2 text-muted" style={{ color: "#34495e" }}>
                                    Match Found: {donorDetails[3] === true ? `Yes` : `No`}
                                </h3>
                                <h3 className="card-subtitle mb-2 text-muted" style={{ color: "#34495e" }}>
                                    Recipient ID: {donorDetails[4] === true ? `Recipient id: ${donorDetails[4]}` : ``}
                                </h3>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div />
                )}
            </div>
        </>
    );
};

export default DonorLogin;
