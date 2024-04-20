import React from "react";
import HospitalNav from "./Hospital_nav";
import Testimonials from "./Testimonials";

function Main_page() {
    return (
        <>
            <div style={{ minHeight: "100vh", background: "#000000" }}>
                <HospitalNav />
                <Testimonials />
            </div>
        </>
    );
}

export default Main_page;
