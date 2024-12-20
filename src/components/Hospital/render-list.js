import React, { useContext, useState } from "react";
import { Card, Button, Header, Portal, Segment } from "semantic-ui-react";
import { ethers } from "ethers";
import TokenABI from "../../ethereum/abi.json";
import { AuthContext } from "../Context";

const RenderList = (props) => {
    console.log("🚀 ~ RenderList ~ props:", props);
    const { currentUser } = useContext(AuthContext);
    const [state, setState] = useState({
        donorId: "",
        bloodgroup: "",
        organ: "",
        donorFound: false,
        loading: false,
        open: false,
        wallet: "",
    });

    const tokenContractAddress = "0xa7a377343Ded512c623C905998604537653743a4";

    const onMatch = async (addr) => {
        setState({ ...state, loading: true, open: false });

        if (typeof window.ethereum !== "undefined") {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const tokenContract = new ethers.Contract(tokenContractAddress, TokenABI, signer);
                console.log("🚀 ~ onMatch ~ tokenContract:", tokenContract);

                const result = await tokenContract.transplantMatch(addr);
                console.log("🚀 ~ onMatch ~ result:", result);

                if (result === "false") {
                    throw Object.assign(new Error("Match Not Found!"));
                } else {
                    const donorId = await tokenContract.getMatchedDonor(addr);
                    console.log("🚀 ~ onMatch ~ donorId:", donorId);
                    const donor = await tokenContract.getDonor(addr);
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
                                <strong>Name : </strong> {state.displayName} <br />
                                <br />
                                <strong>Wallet : </strong>{" "}
                                {`${state.recipientId.slice(0, 4)}...${state.recipientId.slice(
                                    -4,
                                    state.recipientId.length
                                )}`}{" "}
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
                            <Card.Meta>
                                <p style={{ textTransform: "capitalize" }}>{`${props?.recipient?.type}`}</p>
                            </Card.Meta>
                            <br />
                            <strong>Organ : </strong> {props?.recipient?.organ} <br />
                            <br />
                            <strong>Blood Group : </strong> {props?.recipient?.bloodgroup} <br />
                            <br />
                            <strong>Name : </strong> {props?.recipient?.displayName + " " + props?.recipient?.lname}{" "}
                            <br />
                            <br />
                            {props?.recipient?.wallet && (
                                <>
                                    <strong>Wallet : </strong>{" "}
                                    {`${props?.recipient?.wallet?.slice(0, 4)}...${props?.recipient?.wallet?.slice(
                                        -4,
                                        props?.recipient?.wallet?.length
                                    )}`}{" "}
                                </>
                            )}
                            <br />
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
                        ) : currentUser.type === "hospital" ? (
                            <Button
                                loading={state.loading}
                                content="Match"
                                positive
                                onClick={() => onMatch(props.recipient.wallet || props?.recipient?.recipientId)}
                            />
                        ) : null}
                    </Card.Content>
                </Card>
            </Card.Group>
        </>
    );
};

export default RenderList;
