import React, { useContext, useEffect } from "react";
import HospitalNav from "./Hospital/Hospital_nav";
import getUsers from "../api/getUsers";
import { Button } from "semantic-ui-react";
import { ethers } from "ethers";
import TokenABI from "../ethereum/abi.json";
import updateUser from "../api/updateUser";
import Top3 from "./Navbar/Top3";
import { AuthContext } from "./Context";

export default function DonorList() {
    const [donorList, setDonorList] = React.useState([]);
    const { currentUser } = useContext(AuthContext);
    const tokenContractAddress = "0xa7a377343Ded512c623C905998604537653743a4";

    const getDonorData = async () => {
        try {
            const data = await getUsers();
            const filter = data.filter((item) => item.type === "donor" && item.status === false);
            console.log("🚀 ~ getDonorData ~ filter:", filter);
            setDonorList(filter);
        } catch (error) {
            console.log(error);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Wallet Address copied!");
    };

    const onDecline = async (donor) => {
        try {
            await updateUser(donor.id, { approveStatus: false });
            getDonorData();
            alert("Donor Declined!");
        } catch (error) {
            console.log(error);
        }
    };

    const onApprove = async (donor) => {
        // event.preventDefault();

        try {
            if (typeof window.ethereum !== "undefined") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const tokenContract = new ethers.Contract(tokenContractAddress, TokenABI, signer);
                console.log(
                    donor?.wallet,
                    donor?.displayName,
                    donor?.lname,
                    donor?.gender,
                    donor?.city,
                    donor?.phone,
                    donor?.email,
                    donor?.organ,
                    donor?.bloodgroup
                );
                const addDonor = await tokenContract.addDonor(
                    donor?.wallet,
                    donor?.displayName,
                    donor?.lname,
                    donor?.gender,
                    donor?.city,
                    donor?.phone,
                    donor?.email,
                    donor?.organ,
                    donor?.bloodgroup
                );
                const result1 = await addDonor.wait();
                await updateUser(donor.id, { status: true });
                getDonorData();
                console.log("🚀 ~ onApprove ~ result1:", result1);
                alert("Donor Approved !");
            } else {
                alert("Please install MetaMask to use this dApp");
            }
        } catch (err) {
            alert("Donor doesn't exist or already exists");
            console.log(err);
        }
    };

    useEffect(() => {
        getDonorData();
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
                        Donor List
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
                                    {currentUser?.type === "hospital" && <th>Action</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {donorList.map((donor, idx) => (
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
                                            {donor.displayName}
                                        </td>
                                        <td
                                            style={{
                                                paddingLeft: "10px",
                                                paddingRight: "10px",
                                                paddingTop: "5px",
                                                paddingBottom: "5px",
                                            }}
                                        >
                                            {donor.lname}
                                        </td>
                                        <td
                                            style={{
                                                paddingLeft: "10px",
                                                paddingRight: "10px",
                                                paddingTop: "5px",
                                                paddingBottom: "5px",
                                            }}
                                        >
                                            {donor.email}
                                        </td>
                                        <td
                                            style={{
                                                paddingLeft: "10px",
                                                paddingRight: "10px",
                                                paddingTop: "5px",
                                                paddingBottom: "5px",
                                            }}
                                        >
                                            {donor.gender}
                                        </td>
                                        <td
                                            style={{
                                                paddingLeft: "10px",
                                                paddingRight: "10px",
                                                paddingTop: "5px",
                                                paddingBottom: "5px",
                                            }}
                                        >
                                            {donor.organ}
                                        </td>
                                        <td
                                            style={{
                                                paddingLeft: "10px",
                                                paddingRight: "10px",
                                                paddingTop: "5px",
                                                paddingBottom: "5px",
                                            }}
                                        >
                                            {donor.bloodgroup}
                                        </td>
                                        <td
                                            style={{
                                                paddingLeft: "10px",
                                                paddingRight: "10px",
                                                paddingTop: "5px",
                                                paddingBottom: "5px",
                                            }}
                                        >
                                            {donor.phone}
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
                                            {`${donor.wallet.slice(0, 4)}...${donor.wallet.slice(
                                                donor.wallet.length - 4,
                                                donor.wallet.length
                                            )}`}
                                            <i
                                                className="fa fa-fw fa-copy"
                                                style={{
                                                    fontSize: "1em",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                                onClick={() => copyToClipboard(donor.wallet)}
                                            />
                                        </td>
                                        {currentUser?.type === "hospital" && donor?.approveStatus && (
                                            <td
                                                style={{
                                                    paddingLeft: "10px",
                                                    paddingRight: "10px",
                                                    paddingTop: "5px",
                                                    paddingBottom: "5px",
                                                }}
                                            >
                                                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                                    <Button positive type="submit" onClick={() => onApprove(donor)}>
                                                        Approve
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
                                                        onClick={() => onDecline(donor)}
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
