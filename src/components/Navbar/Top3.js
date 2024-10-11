import React, { useContext } from "react";
import { AuthContext } from "../Context";

export default function Top3() {
    const { currentUser } = useContext(AuthContext);

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <h1 style={{ color: "white" }}>
                Welcome {currentUser?.displayName}{" "}
                <span style={{ textTransform: "uppercase" }}>({currentUser?.type})</span>
            </h1>
        </div>
    );
}
