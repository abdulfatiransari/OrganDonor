import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import contract from "../../ethereum/web3";
import Web3 from "web3";
import RenderList from "./render-list";
import { Header, Divider, Grid, Button } from "semantic-ui-react";
import HospitalNav from "./Hospital_nav";

const TransplantMatch = () => {
    const [recipientArr, setRecipientArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState("");
    const [recipientCount, setRecipientCount] = useState(0);

    const onCheck = async (event) => {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const hospitalId = decodedToken.key;

        if (typeof window.ethereum !== "undefined") {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const web3 = new Web3(window.ethereum);
                const accounts = await web3.eth.getAccounts();
                const account = accounts[0];

                const result = await contract.methods.getRecipientCount(hospitalId).call();
                const newRecipientArr = [];

                for (let i = 0; i < result[0]; i++) {
                    const recipient = await contract.methods.getRecipientDetail(hospitalId, i).call();

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
            const newRecipientArr = [];

            // Loop through the recipients array and push each recipient to newRecipientArr
            recipients.forEach((recipient) => {
                // Check if any field of the recipient is empty
                if (recipient.recipientId === "" || recipient.organ === "" || recipient.bloodgroup === "") {
                    return; // Skip this recipient if any field is empty
                }

                // Clone the recipient object to avoid mutating the original object
                const clonedRecipient = { ...recipient };

                // Push the cloned recipient to the new array
                newRecipientArr.push(clonedRecipient);
            });

            // Set the state with the new array of recipients
            setRecipientArr(newRecipientArr);
        } catch (err) {
            console.log("Error Caught => ", err);
            setErrMsg("Error caught: " + err);
        }
    };

    console.log(recipientArr);

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
            {/* {loading ? (
                <Header as="h3" color="grey" style={{ textAlign: "center" }}>
                    Click Below if you want to see the transplant matches <br />
                    <Button positive type="submit" onClick={onCheck}>
                        Check
                    </Button>
                </Header>
            ) : ( */}
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
            {/* )} */}
        </div>
    );
};

export default TransplantMatch;
