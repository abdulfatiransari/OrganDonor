import React, { useState } from "react";
import { Grid, Form, Segment, Header, Button, Icon, Divider, Message } from "semantic-ui-react";
import HospitalNav from "./Hospital_nav";
import contract from "../../ethereum/web3";
import Web3 from "web3";

const sha3 = require("js-sha3");
const { toChecksumAddress } = require("ethereumjs-util");

const PatientRecord = () => {
    const [state, setState] = useState({
        publicKey: "",
        ipfsHash: "",
        loading: false,
        errMsg: "",
    });

    const onChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setState({ ...state, loading: true, errMsg: "" });

        const { publicKey } = state;
        const hash = sha3.keccak256(publicKey);
        const addressBytes = hash.slice(-20);
        const address = "0x" + Buffer.from(addressBytes).toString("hex");
        const checksumAddress = toChecksumAddress(address);

        if (typeof window.ethereum !== "undefined") {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];

            try {
                const ipfsHash = await contract.methods.getEMR(checksumAddress).send({
                    from: account,
                    gas: 1000000,
                });
                if (!ipfsHash) throw Object.assign(new Error("Patient Doesn't Exists!"));
                setState({ ...state, ipfsHash });
            } catch (err) {
                setState({ ...state, errMsg: err.message });
            }
            setState({ ...state, loading: false });
        } else {
            alert("Please install MetaMask to use this dApp");
        }
    };

    const onSubmitDummy = () => {
        // Simulate submission of patient data and set dummy IPFS hash
        const dummyIPFSHash = "QmXbL9t7DcmxWs97dMjvVcAYNpEjN3dXL2DhRzHHgqCnYz";
        setState({ ...state, ipfsHash: dummyIPFSHash });
    };

    return (
        <>
            <HospitalNav />
            <Grid centered columns={2} style={{ marginTop: "20px" }}>
                <Grid.Column width={6}>
                    <Segment>
                        <Header as="h3" color="grey" style={{ textAlign: "center" }}>
                            Get Patient's EMR
                        </Header>
                        <Divider />
                        <Form onSubmit={onSubmit}>
                            <Form.Input
                                value={state.publicKey}
                                onChange={onChange}
                                name="publicKey"
                                label="Public Key"
                                placeholder="Public Key"
                                required
                            />
                            <Message error header="Oops!" content={state.errMsg} />
                            <Segment basic textAlign={"center"}>
                                <Button positive onClick={onSubmitDummy}>
                                    Get EMR
                                </Button>
                            </Segment>
                        </Form>
                        <Segment basic textAlign={"center"}>
                            {state.ipfsHash && (
                                <Button
                                    primary
                                    style={{ textAlign: "center" }}
                                    href={`https://ipfs.io/ipfs/${state.ipfsHash}`}
                                    target="_blank"
                                >
                                    <Icon name="download" /> Download EMR
                                </Button>
                            )}
                        </Segment>
                    </Segment>
                </Grid.Column>
            </Grid>
        </>
    );
};

export default PatientRecord;
