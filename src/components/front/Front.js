import Web3 from "web3";
import { useContext, useState } from "react";
import ConnectWalletButton from "../connect_wallet/ConnectWalletButton";
import { AuthContext } from "../Context";

const Front = () => {
    const [loading, setLoading] = useState(false);
    const { address, setAddress } = useContext(AuthContext);
    console.log("🚀 ~ Front ~ address:", address);

    const onPressConnect = async () => {
        setLoading(true);

        try {
            if (window?.ethereum?.isMetaMask) {
                // Desktop browser
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });

                const account = Web3.utils.toChecksumAddress(accounts[0]);
                setAddress(account);
            }
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    const onPressLogout = () => setAddress("");

    return (
        <div className="App">
            <header className="App-header">
                <ConnectWalletButton
                    onPressConnect={onPressConnect}
                    onPressLogout={onPressLogout}
                    loading={loading}
                    address={address}
                />
            </header>
        </div>
    );
};

export default Front;
