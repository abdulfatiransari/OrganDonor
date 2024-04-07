import React from "react";

import Top from "./Navbar/Top";
import Corous from "./corousal/Corous";
import About from "./About/About";
import Success from "./Success_Story/Success";
import Partner from "./Partner_with_us/Partner";

const Home = () => {
    return (
        <>
            <div style={{ backgroundColor: "black" }}>
                <Top />
                <Corous />
                <About />
                <Success />
                <Partner />
            </div>
        </>
    );
};

export default Home;
