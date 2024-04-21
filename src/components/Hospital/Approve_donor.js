import React, { useState } from "react";
import { Form, Segment, Header, Button, Divider, Message } from "semantic-ui-react";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import HospitalNav from "./Hospital_nav";
import contract from "../../ethereum/web3";
import Web3 from "web3";
const sha3 = require("js-sha3");
const { toChecksumAddress } = require("ethereumjs-util");

const ApproveDonor = () => {
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        donorId: "",
        loading: false,
        errMsg: "",
        successMsg: "",
    });

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const onApprove = async (event) => {
        event.preventDefault();

        setFormData({ ...formData, errMsg: "", successMsg: "" });

        const { fname, lname, email, donorId } = formData;

        try {
            const res = await axios.get(`http://localhost:5002/api/donors/${email}`);

            const { gender, city, phone, organ, bloodgroup } = res.data;
            const data = JSON.stringify({ fname, lname, gender, city, phone, email });

            var result = "563jhjh";
            setFormData({ ...formData, ipfsHash: result });
            result = "435353";
            setFormData({ ...formData, EMRHash: result });

            if (typeof window.ethereum !== "undefined") {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const web3 = new Web3(window.ethereum);
                const accounts = await web3.eth.getAccounts();
                const account = accounts[0];

                const hash = sha3.keccak256(formData.donorId);
                const addressBytes = hash.slice(-20);
                const address = "0x" + Buffer.from(addressBytes).toString("hex");
                const checksumAddress = toChecksumAddress(address);

                const contract = await contract.deployed(); // Assuming contract is already deployed
                await contract.methods
                    .addDonor(checksumAddress, formData.ipfsHash, formData.EMRHash, organ, bloodgroup)
                    .send({
                        from: accounts[0],
                        gas: 1000000,
                    });
                setFormData({ ...formData, successMsg: "Donor Approved !" });
            } else {
                alert("Please install MetaMask to use this dApp");
            }
        } catch (err) {
            setFormData({ ...formData, errMsg: "Donor doesn't exist or already exists" });
        } finally {
            setFormData({ ...formData, loading: false });
        }
    };

    // const onApprove1 = (event) => {
    //     event.preventDefault();

    //     this.setState({ errMsg: "", successMsg: "" });

    //     const { fname, lname, email, buffer, donorId } = this.state;

    //     axios
    //         .get(`http://localhost:5002/api/donors/${email}`)
    //         .then(async (res) => {
    //             this.setState({ loading: true });

    //             const { gender, city, phone, email, organ, bloodgroup } = res.data;

    //             const data = JSON.stringify({ fname, lname, gender, city, phone, email });

    //             var result = "563jhjh";
    //             this.setState({ ipfsHash: result });
    //             result = "435353";
    //             this.setState({ EMRHash: result });
    //             if (typeof window.ethereum !== "undefined") {
    //                 // Request the user's permission to connect to MetaMask
    //                 await window.ethereum.request({ method: "eth_requestAccounts" });

    //                 // Use MetaMask as the web3 provider
    //                 const web3 = new Web3(window.ethereum);

    //                 // Get the user's account
    //                 const accounts = await web3.eth.getAccounts();

    //                 const account = accounts[0];
    //                 //console.log(account);

    //                 try {
    //                     const hash = sha3.keccak256(this.state.donorId);

    //                     // Take the rightmost 160 bits of the hash value
    //                     const addressBytes = hash.slice(-20);

    //                     // Convert the address bytes to a hexadecimal string
    //                     const address = "0x" + Buffer.from(addressBytes).toString("hex");

    //                     // Use ethereumjs-util to convert the address to checksum format
    //                     const checksumAddress = toChecksumAddress(address);

    //                     console.log(checksumAddress);

    //                     const accounts = await web3.eth.getAccounts();
    //                     await contract.methods
    //                         .addDonor(checksumAddress, this.state.ipfsHash, this.state.EMRHash, organ, bloodgroup)
    //                         .send({
    //                             from: accounts[0],
    //                             gas: 1000000,
    //                         });
    //                     this.setState({ successMsg: "Donor Approved !" });
    //                 } catch (err) {
    //                     this.setState({ errMsg: "Donor doesnt exist or already exists" });
    //                 }
    //                 this.setState({ loading: false });
    //             } else {
    //                 alert("Please install MetaMask to use this dApp");
    //             }
    //         })
    //         .catch((err) => this.setState({ errMsg: err.message }));
    // };

    return (
        <>
            <HospitalNav />
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
                            Approve Donor
                        </Header>
                        <Divider />
                        <Form onSubmit={onApprove} error={!!formData.errMsg}>
                            <Form.Input
                                value={formData.fname}
                                onChange={onChange}
                                name="fname"
                                label="First Name"
                                placeholder="First Name"
                                required
                            />
                            <Form.Input
                                value={formData.lname}
                                onChange={onChange}
                                name="lname"
                                label="Last Name"
                                placeholder="Last Name"
                                required
                            />
                            <Form.Input
                                value={formData.email}
                                onChange={onChange}
                                name="email"
                                label="Email"
                                placeholder="Email"
                                type="email"
                                required
                            />
                            <Form.Input
                                value={formData.donorId}
                                onChange={onChange}
                                name="donorId"
                                label="Donor Public Key"
                                placeholder="0x"
                                required
                            />
                            {formData.errMsg && formData.errMsg.length > 0 ? (
                                <Message success header="Success" content={formData.successMsg} />
                            ) : (
                                <Message error header="Oops!!" content={formData.errMsg} />
                            )}
                            <Segment basic textAlign={"center"}>
                                <Button loading={formData.loading} positive type="submit">
                                    Approve
                                </Button>
                            </Segment>
                        </Form>
                    </Segment>
                </div>
            </div>
        </>
    );
};

export default ApproveDonor;
