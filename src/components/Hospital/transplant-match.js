import React, { useContext, useEffect, useState } from "react";
import RenderList from "./render-list";
import { Header, Divider, Button } from "semantic-ui-react";
import HospitalNav from "./Hospital_nav";
import { ethers } from "ethers";
import TokenABI from "../../ethereum/abi.json";
import getUsers from "../../api/getUsers";
import { AuthContext } from "../Context";
import Top3 from "../Navbar/Top3";

const TransplantMatch = () => {
    const { address } = useContext(AuthContext);
    const [recipientArr, setRecipientArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState("");

    const tokenContractAddress = "0xa7a377343Ded512c623C905998604537653743a4";

    const onCheck = async (event) => {
        if (typeof window.ethereum !== "undefined") {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const tokenContract = new ethers.Contract(tokenContractAddress, TokenABI, signer);

                const result = await tokenContract.getRecipientCount(address);
                console.log("🚀 ~ onCheck ~ result:", result);

                // Check if result[0] is a valid number greater than 0
                const recipientCount = parseInt(result);
                if (isNaN(recipientCount) || recipientCount <= 0) {
                    console.log("No recipients found.");
                    return;
                }

                let newRecipientArr = [];

                for (let i = 0; i < result; i++) {
                    console.log(address, i);
                    const recipient = await tokenContract.getRecipientDetail(address, i);
                    console.log("🚀 ~ onCheck ~ recipient:", recipient);

                    if (recipient[1] === "") {
                        continue;
                    }

                    const data = JSON.stringify({
                        recipientId: recipient[0],
                        organ: recipient[2],
                        bloodgroup: recipient[3],
                    });
                    const element = JSON.parse(data);
                    newRecipientArr.push(element);
                }
                console.log(newRecipientArr);
                setRecipientArr(newRecipientArr);
            } catch (err) {
                console.log("Error Caught => ", err);
                setErrMsg("Error caught: " + err);
            }
            setLoading(false);
        } else {
            alert("Please check MetaMask and make sure you are logged in.");
        }
    };

    const recipients = [
        {
            recipientId: "1",
            organ: "Kidney",
            bloodgroup: "O+",
        },
        {
            recipientId: "2",
            organ: "Liver",
            bloodgroup: "A-",
        },
        {
            recipientId: "3",
            organ: "Liver",
            bloodgroup: "A-",
        },
        {
            recipientId: "4",
            organ: "Liver",
            bloodgroup: "A-",
        },
        {
            recipientId: "5",
            organ: "Liver",
            bloodgroup: "A-",
        },
        {
            recipientId: "6",
            organ: "Liver",
            bloodgroup: "A-",
        },
        {
            recipientId: "7",
            organ: "Liver",
            bloodgroup: "A-",
        },
        {
            recipientId: "8",
            organ: "Liver",
            bloodgroup: "A-",
        },
        // Add more recipients as needed
    ];

    const onCheckdummy = async (event) => {
        try {
            const data = await getUsers();
            const filter = data.filter((item) => item.type === "needy" && item.status === false);
            // setNeedyList(filter);

            const newRecipientArr = [];
            filter.forEach((recipient) => {
                if (recipient.recipientId === "" || recipient.organ === "" || recipient.bloodgroup === "") {
                    return;
                }
                const clonedRecipient = { ...recipient };
                newRecipientArr.push(clonedRecipient);
            });
            setRecipientArr(newRecipientArr);
        } catch (err) {
            console.log("Error Caught => ", err);
            setErrMsg("Error caught: " + err);
        }
    };

    const renderList = () => {
        return (
            <div style={{ width: "100%" }}>
                <Header as="h3" color="grey" style={{ textAlign: "center" }}>
                    Recipients Associated with the Hospital
                    <br />
                </Header>
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
                    {recipientArr.map((recipient) => (
                        <div key={recipient.recipientId}>
                            <RenderList recipient={recipient} />
                            <Divider />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    useEffect(() => {
        onCheckdummy();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Oncheck = async (event) => {
    //     const token = localStorage.getItem("token");
    //     const decodedToken = jwtDecode(token);

    //     const hospitalId = decodedToken.key;

    //     if (typeof window.ethereum !== "undefined") {
    //         // Request the user's permission to connect to MetaMask
    //         await window.ethereum.request({ method: "eth_requestAccounts" });
    //         // Use MetaMask as the web3 provider
    //         const web3 = new Web3(window.ethereum);
    //         // Get the user's account
    //         const accounts = await web3.eth.getAccounts();
    //         const account = accounts[0];

    //         try {
    //             const result = await contract.methods.getRecipientCount(hospitalId).call();
    //             var recipient_arr = [];

    //             for (let i = 0; i < result[0]; i++) {
    //                 const recipient = await contract.methods.getRecipientDetail(hospitalId, i).call();

    //                 if (recipient[1] === "") {
    //                     continue;
    //                 }

    //                 const temp = recipient[1];
    //                 const data = JSON.stringify({
    //                     recipientId: recipient[0],
    //                     organ: recipient[2],
    //                     bloodgroup: recipient[3],
    //                 });
    //                 const element = JSON.parse(data);
    //                 recipient_arr.push(element);
    //             }
    //             this.setState({ recipient_arr });
    //         } catch (err) {
    //             console.log("Error Catched => " + err);
    //         }
    //         this.setState({ loading: false });
    //     } else {
    //         alert("check the metamask and if you are logged In");
    //     }
    // };

    // renderList = () => {
    //     const List = this.state.recipient_arr.map((recipient) => {
    //         return (
    //             <div key={recipient.recipientId}>
    //                 <RenderList recipient={recipient} />
    //                 <Divider />
    //             </div>
    //         );
    //     });
    //     return <div>{List}</div>;
    // };

    return (
        <div>
            <HospitalNav />
            <div>
                <Top3 />
                {loading ? (
                    <Header as="h3" color="grey" style={{ textAlign: "center" }}>
                        Click Below if you want to see the transplant matches <br />
                        <Button positive type="submit" onClick={onCheck}>
                            Check
                        </Button>
                    </Header>
                ) : (
                    <div
                        style={{
                            marginTop: "20px",
                            display: "flex",
                            paddingLeft: "60px",
                            paddingRight: "10px",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                gap: "20px",
                                flexWrap: "wrap",
                                justifyContent: "center",
                                width: "100%",
                            }}
                        >
                            {renderList()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransplantMatch;
