import { useContext, useState } from "react";
import "./styles.css";
import Front from "../front/Front";
import Top2 from "../Navbar/Top2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import addUser from "../../api/addUser";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context";
import { Link } from "react-router-dom";

function Needy_signup() {
    const { address } = useContext(AuthContext);
    console.log("🚀 ~ Needy_signup ~ address:", address);
    const [state, setState] = useState({
        fname: "",
        lname: "",
        gender: "Male",
        city: "Karachi",
        phone: "",
        email: "",
        bloodgroup: "A+",
        organ: "Eyes",
        errMsg: "",
        succMsg: "",
        pass: "",
        weight: "",
        height: "",
    });

    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        setState((prevState) => ({ ...prevState, errMsg: "" }));

        try {
            if (!address) {
                console.log("wallet connect first");
                alert("Wallet Connect First");
                return;
            }
            const { fname, lname, gender, city, phone, email, bloodgroup, pass, weight, height, organ } = state;
            createUserWithEmailAndPassword(auth, email, pass).then(async ({ user }) => {
                try {
                    await addUser({
                        accessToken: user.accessToken,
                        displayName: fname,
                        lname: lname,
                        email: email,
                        gender: gender,
                        city: city,
                        bloodgroup: bloodgroup,
                        phone: phone,
                        organ: organ,
                        weight: weight,
                        height: height,
                        wallet: address,
                        type: "needy",
                        status: false,
                        approveStatus: true,
                        reloadUserInfo: user.reloadUserInfo,
                        uid: user.uid,
                    });
                    navigate("/");
                } catch (error) {
                    console.log(error);
                }
            });
        } catch (error) {
            setState((prevState) => ({ ...prevState, errMsg: error.message }));
        }
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <>
            <div style={{ background: "#000000", minHeight: "100vh" }}>
                <Top2 />
                <div className="login">
                    <div className="form_wrapper" style={{ background: "#00000080" }}>
                        <div className="form_container">
                            <div className="title_container">
                                <h2 style={{ color: "white" }}>Organ Recipient Signup</h2>
                            </div>
                            <div className="row clearfix">
                                <div className="">
                                    <form onSubmit={onSubmit}>
                                        <div className="input_field select_option">
                                            {" "}
                                            <span>
                                                <i aria-hidden="true" className="fa fa-envelope"></i>
                                            </span>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={state.email}
                                                required
                                                onChange={onChange}
                                            />
                                        </div>
                                        <div className="input_field select_option">
                                            {" "}
                                            <span>
                                                <i aria-hidden="true" className="fa fa-key"></i>
                                            </span>
                                            <input
                                                type="password"
                                                name="pass"
                                                placeholder="Password"
                                                value={state.pass}
                                                required
                                                onChange={onChange}
                                            />
                                        </div>
                                        <div className="input_field select_option ">
                                            <span>
                                                <FontAwesomeIcon icon={faPhone} />
                                            </span>
                                            <input
                                                type="tel"
                                                className="icon"
                                                // style={{ width: "360px", height: "33px" }}
                                                value={state.phone}
                                                onChange={onChange}
                                                name="phone"
                                                placeholder="Phone number"
                                            />
                                        </div>
                                        <div className="row clearfix">
                                            <div className="col_half">
                                                <div className="input_field select_option">
                                                    <input
                                                        type="text"
                                                        name="fname"
                                                        placeholder="First Name"
                                                        value={state.fname}
                                                        onChange={onChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col_half">
                                                <div className="input_field select_option">
                                                    <input
                                                        type="text"
                                                        name="lname"
                                                        placeholder="Last Name"
                                                        value={state.lname}
                                                        onChange={onChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="input_field select_option">
                                            <select
                                                name="gender"
                                                placeholder="Gender"
                                                value={state.gender}
                                                onChange={onChange}
                                                required
                                            >
                                                <option value="" disabled hidden>
                                                    <center>Select Gender</center>
                                                </option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Others">Other</option>
                                            </select>
                                        </div>
                                        <div className="input_field select_option">
                                            <select
                                                name="bloodgroup"
                                                placeholder="Blood Group"
                                                value={state.bloodgroup}
                                                onChange={onChange}
                                                required
                                            >
                                                <option>Select a Blood Type</option>
                                                <option value="A-">A-</option>
                                                <option value="A+">A+</option>
                                                <option value="B-">B-</option>
                                                <option value="B+">B+</option>
                                                <option value="AB-">AB-</option>
                                                <option value="AB+">AB+</option>
                                                <option value="O-">O-</option>
                                                <option value="O+">O+</option>
                                            </select>
                                        </div>
                                        <div className="input_field">
                                            <input
                                                type="number"
                                                name="weight"
                                                placeholder="weight(in kg)"
                                                required
                                                onChange={onChange}
                                                style={{ width: "100%" }}
                                            />
                                        </div>
                                        <div className="input_field">
                                            <input
                                                type="number"
                                                name="height"
                                                placeholder="height(in cm)"
                                                required
                                                onChange={onChange}
                                                style={{ width: "100%" }}
                                            />
                                        </div>
                                        <div className="input_field select_option">
                                            <select
                                                name="city"
                                                placeholder="Choose City"
                                                value={state.city}
                                                onChange={onChange}
                                                required
                                            >
                                                <option>Select a City for Hospital location</option>
                                                <option value="Karachi">Karachi</option>
                                                <option value="Lahore">Lahore</option>
                                                <option value="Islamabad">Islamabad</option>
                                                <option value="Rawalpindi">Rawalpindi</option>
                                                <option value="Peshawar">Peshawar</option>
                                                <option value="Multan">Multan</option>
                                            </select>
                                        </div>
                                        <div className="input_field select_option">
                                            <select
                                                name="organ"
                                                placeholder="Choose Organ"
                                                value={state.organ}
                                                onChange={onChange}
                                                required
                                            >
                                                <option>Select a organ to need</option>
                                                <option value="Eyes">Eyes</option>
                                                <option value="Heart">Heart</option>
                                                <option value="Lungs">Lungs</option>
                                                <option value="Liver">Liver</option>
                                                <option value="Pancreas">Pancreas</option>
                                                <option value="Kidney">Kidney</option>
                                            </select>
                                        </div>
                                        {address && (
                                            <p style={{ color: "white" }}>{`${address.slice(0, 6)}...${address.slice(
                                                address.length - 6,
                                                address.length
                                            )}`}</p>
                                        )}

                                        <Front />
                                        <input className="button" type="submit" value="Register" />
                                    </form>
                                    <div>
                                        <p style={{ color: "white" }}>
                                            Already have an account? <Link to="/needylogin"> Login</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Needy_signup;
