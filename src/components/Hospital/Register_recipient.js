import React, { useState } from "react";
import { Form, Button, Grid, Segment, Header, Divider, Message } from "semantic-ui-react";
import Hospitalnav from "./Hospital_nav";
import jwtDecode from "jwt-decode";

import contract from "../../ethereum/web3";
import Web3 from "web3";
import { ethers } from "ethers";
import TokenABI from "../../ethereum/abi.json";

const sha3 = require("js-sha3");
const { toChecksumAddress } = require("ethereumjs-util");

const RegisterRecipient = () => {
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        gender: "Male",
        city: "Karachi",
        phone: "",
        email: "",
        bloodgroup: "A+",
        organ: "Eyes",
        buffer: null,
        ipfsHash: "12345",
        publicKey: "",
        EMRHash: "12345",
        loading: false,
        errMsg: "",
        successMsg: "",
    });

    const tokenContractAddress = "0xa7a377343Ded512c623C905998604537653743a4";

    // const onSubmit = async (event) => {
    //     event.preventDefault();
    //     setFormData({ ...formData, loading: true, errMsg: "", successMsg: "" });

    //     const { fname, lname, gender, city, phone, email, bloodgroup, organ, publicKey } = formData;

    //     if (typeof window.ethereum !== "undefined") {
    //         await window.ethereum.request({ method: "eth_requestAccounts" });
    //         const web3 = new Web3(window.ethereum);
    //         const accounts = await web3.eth.getAccounts();
    //         const account = accounts[0];
    //         try {
    //             const data = JSON.stringify({ fname, lname, gender, city, phone, email });
    //             const buf = Buffer.from(data);
    //             var result = "Qm1d4";
    //             var result1 = "Qm1d";
    //             setFormData({ ...formData, EMRHash: result });

    //             const hash = sha3.keccak256(formData.publicKey);
    //             const addressBytes = hash.slice(-20);
    //             const address = "0x" + Buffer.from(addressBytes).toString("hex");
    //             const checksumAddress = toChecksumAddress(address);

    //             // const token = localStorage.getItem("token");
    //             // console.log("🚀 ~ onSubmit ~ token:", token);
    //             // const decodedToken = jwtDecode(token);
    //             // console.log("🚀 ~ onSubmit ~ decodedToken:", decodedToken);
    //             // const hospitalid = decodedToken.key;
    //             // console.log("🚀 ~ onSubmit ~ hospitalid:", hospitalid);

    //             await contract.methods
    //                 .addRecipient(checksumAddress, checksumAddress, result, result1, organ, bloodgroup)
    //                 .send({
    //                     from: account,
    //                     gas: 1000000,
    //                 });
    //             setFormData({ ...formData, successMsg: "Repient Registered Successfully!", loading: false });
    //         } catch (err) {
    //             setFormData({ ...formData, errMsg: "Cannot send data already present user", loading: false });
    //         }
    //     } else {
    //         alert("Please install MetaMask to use this dApp");
    //     }
    // };

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormData({ ...formData, loading: true, errMsg: "", successMsg: "" });

        const { fname, lname, gender, city, phone, email, bloodgroup, organ, publicKey } = formData;

        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const gasPrice = await signer.getGasPrice();
            const tokenContract = new ethers.Contract(tokenContractAddress, TokenABI, signer);
            try {
                const data = JSON.stringify({ fname, lname, gender, city, phone, email });
                const buf = Buffer.from(data);
                console.log("🚀 ~ onSubmit ~ buf:", buf);
                var result = "Qm1d4";
                var result1 = "Qm1d";
                setFormData({ ...formData, EMRHash: result });

                const hash = sha3.keccak256(formData.publicKey);
                const addressBytes = hash.slice(-20);
                const address = "0x" + Buffer.from(addressBytes).toString("hex");
                const checksumAddress = toChecksumAddress(address);

                const addRecepient = await tokenContract.addRecipient(
                    checksumAddress,
                    checksumAddress,
                    fname,
                    lname,
                    gender,
                    city,
                    phone,
                    email,
                    organ,
                    bloodgroup
                );
                console.log(addRecepient);
                setFormData({ ...formData, successMsg: "Repient Registered Successfully!", loading: false });
            } catch (err) {
                console.log(err);
                setFormData({ ...formData, errMsg: "Cannot send data already present user", loading: false });
            }
        } else {
            alert("Please install MetaMask to use this dApp");
        }
    };

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    // onSubmit = async (event) => {
    //     event.preventDefault();

    //     this.setState({ loading: true, errMsg: "", successMsg: "" });

    //     const { fname, lname, gender, city, phone, email, bloodgroup, organ, buffer, publicKey } = this.state;
    //     //console.log(fname);

    //     if (typeof window.ethereum !== "undefined") {
    //         // Request the user's permission to connect to MetaMask
    //         await window.ethereum.request({ method: "eth_requestAccounts" });

    //         // Use MetaMask as the web3 provider
    //         const web3 = new Web3(window.ethereum);

    //         // Get the user's account
    //         const accounts = await web3.eth.getAccounts();

    //         const account = accounts[0];
    //         //console.log(account);

    //         try {
    //             const data = JSON.stringify({ fname, lname, gender, city, phone, email });

    //             const buf = Buffer.from(data);

    //             var result = "Qm1d4";

    //             var result1 = "Qm1d";
    //             this.setState({ EMRHash: result });

    //             const hash = sha3.keccak256(this.state.publicKey);

    //             // Take the rightmost 160 bits of the hash value
    //             const addressBytes = hash.slice(-20);

    //             // Convert the address bytes to a hexadecimal string
    //             const address = "0x" + Buffer.from(addressBytes).toString("hex");

    //             // Use ethereumjs-util to convert the address to checksum format
    //             const checksumAddress = toChecksumAddress(address);

    //             const token = localStorage.getItem("token");
    //             const decodedToken = jwtDecode(token);
    //             console.log(decodedToken);
    //             const hospitalid = decodedToken.key;

    //             await contract.methods
    //                 .addRecipient(checksumAddress, hospitalid, result, result1, organ, bloodgroup)
    //                 .send({
    //                     from: account,
    //                     gas: 1000000,
    //                 });
    //             this.setState({ successMsg: "Repient Registered Successfully!" });
    //             this.setState({ loading: false });

    //             // Use the account for your contract interactions
    //             // ...
    //         } catch (err) {
    //             this.setState({ errMsg: "Cannot send data already present user" });
    //             this.setState({ loading: false });
    //         }

    //         // Use the account for your contract interactions
    //         // ...
    //     } else {
    //         // MetaMask is not installed, show an error message
    //         alert("Please install MetaMask to use this dApp");
    //     }
    // };

    // captureFile = (event) => {
    //     const file = event.target.files[0];
    //     const reader = new window.FileReader();
    //     reader.readAsArrayBuffer(file);
    //     reader.onloadend = () => {
    //         this.setState({ buffer: Buffer(reader.result) });
    //     };
    // };

    // onChange = (event) => {
    //     //console.log(event.target.value);
    //     this.setState({ [event.target.name]: event.target.value });
    // };

    return (
        <div>
            <Hospitalnav />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                    paddingLeft: "80px",
                    paddingRight: "20px",
                    paddingBottom: "20px",
                }}
            >
                <div style={{ width: "100%", maxWidth: "500px" }}>
                    <Segment>
                        <Header as="h3" color="grey" style={{ textAlign: "center" }}>
                            Register New Recipient
                        </Header>
                        <Divider />
                        <Form onSubmit={onSubmit} error={!!formData.errMsg} success={!!formData.successMsg}>
                            <Form.Group widths={2}>
                                <Form.Input
                                    value={formData.fname}
                                    onChange={onChange}
                                    name="fname"
                                    label="First name"
                                    placeholder="First name"
                                    required
                                />
                                <Form.Input
                                    value={formData.lname}
                                    onChange={onChange}
                                    name="lname"
                                    label="Last name"
                                    placeholder="Last name"
                                    required
                                />
                            </Form.Group>
                            <Form.Group widths={2}>
                                <Form.Field
                                    value={formData.gender}
                                    onChange={onChange}
                                    name="gender"
                                    label="Gender"
                                    control="select"
                                    required
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Form.Field>
                                <Form.Field
                                    value={formData.city}
                                    onChange={onChange}
                                    name="city"
                                    label="City"
                                    control="select"
                                    required
                                >
                                    <option value="Karachi">Karachi</option>
                                    <option value="Lahore">Lahore</option>
                                    <option value="Islamabad">Islamabad</option>
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths={2}>
                                <Form.Input
                                    value={formData.phone}
                                    onChange={onChange}
                                    name="phone"
                                    label="Phone"
                                    placeholder="Phone"
                                    required
                                />
                                <Form.Input
                                    value={formData.email}
                                    onChange={onChange}
                                    name="email"
                                    type="email"
                                    label="Email"
                                    placeholder="Email"
                                    required
                                />
                            </Form.Group>
                            <Form.Group widths={2}>
                                <Form.Field
                                    value={formData.bloodgroup}
                                    onChange={onChange}
                                    name="bloodgroup"
                                    label="Blood Group"
                                    control="select"
                                    required
                                >
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </Form.Field>
                                <Form.Field
                                    value={formData.organ}
                                    onChange={onChange}
                                    name="organ"
                                    label="Organ"
                                    control="select"
                                    required
                                >
                                    <option value="Eyes">Eyes</option>
                                    <option value="Heart">Heart</option>
                                    <option value="Kidney">Kidney</option>
                                    <option value="Liver">Liver</option>
                                    <option value="Lungs">Lungs</option>
                                    <option value="Pancreas">Pancreas</option>
                                </Form.Field>
                            </Form.Group>

                            <Message error header="Oops!" content={formData.errMsg} />
                            <Message success header="Success" content={formData.successMsg} />
                            <Segment basic textAlign={"center"}>
                                <Button loading={formData.loading} positive type="submit">
                                    Register
                                </Button>
                            </Segment>
                        </Form>
                    </Segment>
                </div>
            </div>
        </div>
    );
};

export default RegisterRecipient;
