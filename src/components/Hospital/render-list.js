import React, { useState } from "react";
import { Card, Button, Header, Portal, Segment } from "semantic-ui-react";
import contract from "../../ethereum/web3";
import Web3 from "web3";
import { ethers } from "ethers";
import TokenABI from "../../ethereum/abi.json";

const RenderList = (props) => {
    const [state, setState] = useState({
        donorId: "",
        bloodgroup: "",
        organ: "",
        donorFound: false,
        loading: false,
        open: false,
    });

    const tokenContractAddress = "0xa7a377343Ded512c623C905998604537653743a4";

    const onMatch = async () => {
        setState({ ...state, loading: true, open: false });

        if (typeof window.ethereum !== "undefined") {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const gasPrice = await signer.getGasPrice();
                const tokenContract = new ethers.Contract(tokenContractAddress, TokenABI, signer);
                console.log("🚀 ~ onMatch ~ tokenContract:", tokenContract);

                const result = await tokenContract.transplantMatch("0x4DA21707a86F29033F26c0adBd70E9D105299467");
                console.log("🚀 ~ onMatch ~ result:", result);

                if (result === "false") {
                    throw Object.assign(new Error("Match Not Found!"));
                } else {
                    const donorId = await tokenContract.getMatchedDonor("0x4DA21707a86F29033F26c0adBd70E9D105299467");
                    console.log("🚀 ~ onMatch ~ donorId:", donorId);
                    const donor = await tokenContract.getDonor("0x4DA21707a86F29033F26c0adBd70E9D105299467");
                    console.log("🚀 ~ onMatch ~ donor:", donor);
                    setState({ ...state, donorId, organ: donor[1], bloodgroup: donor[2], donorFound: true });
                }
            } catch (err) {
                setState({ ...state, open: true });
            }
            setState({ ...state, loading: false });
        } else {
            alert("Check MetaMask login");
        }
    };
    // const onMatch = async () => {
    //     setState({ ...state, loading: true, open: false });

    //     if (typeof window.ethereum !== "undefined") {
    //         try {
    //             await window.ethereum.request({ method: "eth_requestAccounts" });
    //             const web3 = new Web3(window.ethereum);
    //             const accounts = await web3.eth.getAccounts();
    //             const account = accounts[0];

    //             const result = await contract.methods.transplantMatch(props.recipient.recipientId).send({
    //                 from: accounts[0],
    //                 gas: 1000000,
    //             });

    //             if (result === "false") {
    //                 throw Object.assign(new Error("Match Not Found!"));
    //             } else {
    //                 const donorId = await contract.methods.getMatchedDonor(props.recipient.recipientId).call();
    //                 const donor = await contract.methods.getDonor(donorId).call();
    //                 setState({ ...state, donorId, organ: donor[1], bloodgroup: donor[2], donorFound: true });
    //             }
    //         } catch (err) {
    //             setState({ ...state, open: true });
    //         }
    //         setState({ ...state, loading: false });
    //     } else {
    //         alert("Check MetaMask login");
    //     }
    // };

    const handleClose = () => setState({ ...state, open: false });

    return (
        <>
            <Card.Group style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                {!state.donorFound ? null : (
                    <Card style={{ minWidth: "260px" }}>
                        <Card.Content>
                            <Card.Description style={{ fontSize: "14px", textAlign: "center" }}>
                                <Card.Meta>{state.donorId}</Card.Meta>
                                <strong>Organ : </strong> {state.organ} <br />
                                <br />
                                <strong>Blood Group : </strong> {state.bloodgroup} <br />
                                <br />
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra style={{ textAlign: "center" }}>
                            <Header as="h3" color="grey">
                                Donor
                            </Header>
                        </Card.Content>
                    </Card>
                )}
                <Card style={{ minWidth: "260px" }}>
                    <Card.Content>
                        <Card.Description style={{ fontSize: "14px", textAlign: "center" }}>
                            <Card.Meta>{props.recipient.recipientId}</Card.Meta>
                            <strong>Organ : </strong> {props.recipient.organ} <br />
                            <br />
                            <strong>Blood Group : </strong> {props.recipient.bloodgroup} <br />
                            <br />
                        </Card.Description>
                    </Card.Content>
                    <Portal onClose={handleClose} open={state.open}>
                        <Segment style={{ left: "40%", position: "fixed", top: "50%", zIndex: 1000 }}>
                            <Header>Sorry, No Match Found!</Header>
                            <Button content="OK" negative onClick={handleClose} />
                        </Segment>
                    </Portal>
                    <Card.Content extra style={{ textAlign: "center" }}>
                        {state.donorFound ? (
                            <Header as="h3" color="grey">
                                Recipient
                            </Header>
                        ) : (
                            <Button loading={state.loading} content="Match" positive onClick={onMatch} />
                        )}
                    </Card.Content>
                </Card>
            </Card.Group>
        </>
    );
};

export default RenderList;
