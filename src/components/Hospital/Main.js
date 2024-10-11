import React from "react";
import HospitalNav from "./Hospital_nav";
import Testimonials from "./Testimonials";
import Top3 from "../Navbar/Top3";

function Main_page() {
    return (
        <>
            <div style={{ minHeight: "100vh", background: "#000000" }}>
                <HospitalNav />
                <div>
                    <Top3 />
                    <Testimonials />
                </div>
            </div>
        </>
    );
}

export default Main_page;
