import React from "react";
import "../corousal/corous.css";

const Corous = () => {
    return (
        //     , where one life ends but countless others bloom.
        <>
            <div className="con">
                <div className="container1" id="courous">
                    <div className="image">
                        <img src={"/images/heart.gif"} alt="" style={{ width: "400px" }} />
                    </div>
                    <div className="text">
                        <div className="heading">
                            <h1>
                                <span>
                                    " Organ donation is not an act of losing, but an act of eternal giving, where one
                                    life ends but countless others bloom."{" "}
                                </span>

                                <span>-John Wilson </span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Corous;
