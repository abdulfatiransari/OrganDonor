import React, { useState } from "react";
import { Form, Segment, Header, Button, Divider, Message } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import HospitalNav from "./Hospital_nav";
import { ethers } from "ethers";
import TokenABI from "../../ethereum/abi.json";

const ApproveDonor = () => {
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        gender: "Male",
        city: "Karachi",
        phone: "",
        donorId: "",
        loading: false,
        errMsg: "",
        successMsg: "",
        bloodgroup: "A+",
        organ: "Eyes",
    });

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const tokenContractAddress = "0xa7a377343Ded512c623C905998604537653743a4";

    const onApprove = async (event) => {
        event.preventDefault();

        setFormData({ ...formData, errMsg: "", successMsg: "" });

        const { fname, lname, email, gender, city, phone, bloodgroup, organ, donorId } = formData;

        try {
            if (typeof window.ethereum !== "undefined") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const gasPrice = await signer.getGasPrice();
                const tokenContract = new ethers.Contract(tokenContractAddress, TokenABI, signer);

                // const res = await axios.get(`http://localhost:5002/api/donors/${email}`);

                // const { gender, city, phone, organ, bloodgroup } = res.data;
                // const data = JSON.stringify({ fname, lname, gender, city, phone, email });

                // var result = "563jhjh";
                // setFormData({ ...formData, ipfsHash: result });
                // result = "435353";
                // setFormData({ ...formData, EMRHash: result });

                // const hash = sha3.keccak256(formData.donorId);
                // const addressBytes = hash.slice(-20);
                // const address = "0x" + Buffer.from(addressBytes).toString("hex");
                // const checksumAddress = toChecksumAddress(address);
                console.log(donorId, fname, lname, gender, city, phone, email, organ, bloodgroup);
                const addDonor = await tokenContract.addDonor(
                    donorId,
                    fname,
                    lname,
                    gender,
                    city,
                    phone,
                    email,
                    // formData.ipfsHash || "retjytjygjgjh",
                    // formData.EMRHash || "dhggfjjg",
                    organ,
                    bloodgroup
                );
                const result1 = await addDonor.wait();
                console.log("🚀 ~ onApprove ~ result1:", result1);
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

    // const onApprove = async (event) => {
    //     event.preventDefault();

    //     setFormData({ ...formData, errMsg: "", successMsg: "" });

    //     const { fname, lname, email, donorId } = formData;

    //     try {
    //         const res = await axios.get(`http://localhost:5002/api/donors/${email}`);

    //         const { gender, city, phone, organ, bloodgroup } = res.data;
    //         const data = JSON.stringify({ fname, lname, gender, city, phone, email });

    //         var result = "563jhjh";
    //         setFormData({ ...formData, ipfsHash: result });
    //         result = "435353";
    //         setFormData({ ...formData, EMRHash: result });

    //         if (typeof window.ethereum !== "undefined") {
    //             await window.ethereum.request({ method: "eth_requestAccounts" });
    //             const web3 = new Web3(window.ethereum);
    //             const accounts = await web3.eth.getAccounts();
    //             const account = accounts[0];

    //             const hash = sha3.keccak256(formData.donorId);
    //             const addressBytes = hash.slice(-20);
    //             const address = "0x" + Buffer.from(addressBytes).toString("hex");
    //             const checksumAddress = toChecksumAddress(address);

    //             const contract = await contract.deployed(); // Assuming contract is already deployed
    //             await contract.methods
    //                 .addDonor(checksumAddress, formData.ipfsHash, formData.EMRHash, organ, bloodgroup)
    //                 .send({
    //                     from: accounts[0],
    //                     gas: 1000000,
    //                 });
    //             setFormData({ ...formData, successMsg: "Donor Approved !" });
    //         } else {
    //             alert("Please install MetaMask to use this dApp");
    //         }
    //     } catch (err) {
    //         setFormData({ ...formData, errMsg: "Donor doesn't exist or already exists" });
    //     } finally {
    //         setFormData({ ...formData, loading: false });
    //     }
    // };

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
                            <Form.Group widths={2}>
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
                            </Form.Group>
                            <Form.Group widths={2}>
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
                                    value={formData.phone}
                                    onChange={onChange}
                                    name="phone"
                                    label="Phone"
                                    placeholder="123456789"
                                    required
                                />
                            </Form.Group>
                            <Form.Input
                                value={formData.donorId}
                                onChange={onChange}
                                name="donorId"
                                label="Donor Public Key"
                                placeholder="0x"
                                required
                            />
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
