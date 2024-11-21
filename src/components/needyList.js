import React, { useContext, useEffect } from "react";
import HospitalNav from "./Hospital/Hospital_nav";
import getUsers from "../api/getUsers";
import updateUser from "../api/updateUser";
import { ethers } from "ethers";
import TokenABI from "../ethereum/abi.json";
import { Button } from "semantic-ui-react";
import { AuthContext } from "./Context";
import Top3 from "./Navbar/Top3";

export default function NeedyList() {
    const { address, currentUser } = useContext(AuthContext);

    const [needyList, setNeedyList] = React.useState([]);
    const tokenContractAddress = "0xa7a377343Ded512c623C905998604537653743a4";

    const getNeedyData = async () => {
        try {
            const data = await getUsers();
            const filter = data.filter((item) => item.type === "needy" && item.status === false);
            setNeedyList(filter);
        } catch (error) {
            console.log(error);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Wallet Address copied!");
    };

    const onDecline = async (needy) => {
        try {
            await updateUser(needy.id, { approveStatus: false });
            getNeedyData();
            alert("Needy Declined!");
        } catch (error) {
            console.log(error);
        }
    };

    const addRecipient = async (needy) => {
        // event.preventDefault();

        try {
            if (typeof window.ethereum !== "undefined") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const tokenContract = new ethers.Contract(tokenContractAddress, TokenABI, signer);
                console.log(
                    needy?.wallet,
                    address,
                    needy?.displayName,
                    needy?.lname,
                    needy?.gender,
                    needy?.city,
                    needy?.phone,
                    needy?.email,
                    needy?.organ,
                    needy?.bloodgroup
                );
                const addRecipient = await tokenContract.addRecipient(
                    needy?.wallet,
                    address,
                    needy?.displayName,
                    needy?.lname,
                    needy?.gender,
                    needy?.city,
                    needy?.phone,
                    needy?.email,
                    needy?.organ,
                    needy?.bloodgroup
                );
                await addRecipient.wait();
                await updateUser(needy.id, { status: true });
                getNeedyData();
                alert("Recipient Approved !");
            } else {
                alert("Please install MetaMask to use this dApp");
            }
        } catch (err) {
            console.log(err);
            alert("Needy doesn't exist or already exists");
        }
    };

    useEffect(() => {
        getNeedyData();
    }, []);
    return (
        <div>
            <HospitalNav />
            <div>
                <Top3 />
                <div>
                    <p
                        style={{
                            color: "white",
                            marginTop: "20px",
                            display: "flex",
                            paddingLeft: "60px",
                            paddingRight: "10px",
                            justifyContent: "center",
                            width: "100%",
                            fontSize: "40px",
                            fontWeight: "bold",
                        }}
                    >
                        Needy List
                    </p>
                    <div
                        style={{
                            overflowX: "auto",
                            color: "white",
                            paddingLeft: "80px",
                            width: "100%",
                        }}
                    >
                        <table style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Organ</th>
                                    <th>Blood Group</th>
                                    <th>Phone no</th>
                                    <th>Wallet</th>
                                    <th>Status</th>
                                    {currentUser?.type === "hospital" && <th>Action</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {needyList.map((needy, idx) => (
                                    <tr key={idx}>
                                        <td
                                            style={{
                                                paddingLeft: "10px",
                                                paddingRight: "10px",
                                                paddingTop: "5px",
                                                paddingBottom: "5px",
                                            }}
                                        >
                                            {idx + 1}
                                        </td>
                                        <td
                                            style={{
                                                paddingLeft: "10px",
                                                paddingRight: "10px",
                                                paddingTop: "5px",
                                                paddingBottom: "5px",
                                            }}
                                        >
                                            {needy.displayName}
                                        </td>
                                        <td
                                            style={{
                                                paddingLeft: "10px",
                                                paddingRight: "10px",
                                                paddingTop: "5px",
                                                paddingBottom: "5px",
                                            }}
                                        >
                                            {needy.lname}
                                        </td>
                                        <td
                                            style={{
                                                paddingLeft: "10px",
                                                paddingRight: "10px",
                                                paddingTop: "5px",
                                                paddingBottom: "5px",
                                            }}
                                        >
                                            {needy.email}
                                        </td>
                                        <td
                                            style={{
                                                paddingLeft: "10px",
                                                paddingRight: "10px",
                                                paddingTop: "5px",
                                                paddingBottom: "5px",
                                            }}
                                        >
                                            {needy.gender}
                                        </td>
                                        <td
                                            style={{
                                                paddingLeft: "10px",
                                                paddingRight: "10px",
                                                paddingTop: "5px",
                                                paddingBottom: "5px",
                                            }}
                                        >
                                            {needy.organ}
                                        </td>
                                        <td
                                            style={{
                                                paddingLeft: "10px",
                                                paddingRight: "10px",
                                                paddingTop: "5px",
                                                paddingBottom: "5px",
                                            }}
                                        >
                                            {needy.bloodgroup}
                                        </td>
                                        <td
                                            style={{
                                                paddingLeft: "10px",
                                                paddingRight: "10px",
                                                paddingTop: "5px",
                                                paddingBottom: "5px",
                                            }}
                                        >
                                            {needy.phone}
                                        </td>
                                        <td
                                            style={{
                                                paddingLeft: "10px",
                                                paddingRight: "10px",
                                                paddingTop: "5px",
                                                paddingBottom: "5px",
                                                display: "flex",
                                                width: "120px",
                                                alignItems: "center",
                                                gap: "5px",
                                            }}
                                        >
                                            {`${needy.wallet.slice(0, 4)}...${needy.wallet.slice(
                                                needy.wallet.length - 4,
                                                needy.wallet.length
                                            )}`}
                                            <i
                                                className="fa fa-fw fa-copy"
                                                style={{
                                                    fontSize: "1em",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                                onClick={() => copyToClipboard(needy.wallet)}
                                            />
                                        </td>
                                        <td
                                            style={{
                                                paddingLeft: "10px",
                                                paddingRight: "10px",
                                                paddingTop: "5px",
                                                paddingBottom: "5px",
                                            }}
                                        >
                                            {needy.approveStatus ? "Pending" : "Declined"}
                                        </td>
                                        {currentUser?.type === "hospital" && needy?.approveStatus && (
                                            <td
                                                style={{
                                                    paddingLeft: "10px",
                                                    paddingRight: "10px",
                                                    paddingTop: "5px",
                                                    paddingBottom: "5px",
                                                }}
                                            >
                                                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                                    <Button positive type="submit" onClick={() => addRecipient(needy)}>
                                                        Add Recipient
                                                    </Button>
                                                    <button
                                                        style={{
                                                            padding: "10px 20px",
                                                            backgroundColor: "red",
                                                            color: "white",
                                                            border: "none",
                                                            borderRadius: "5px",
                                                            cursor: "pointer",
                                                            fontSize: "14px",
                                                        }}
                                                        positive
                                                        type="submit"
                                                        onClick={() => onDecline(needy)}
                                                    >
                                                        Decline
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
