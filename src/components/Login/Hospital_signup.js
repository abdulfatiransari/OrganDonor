import { useContext, useState } from "react";
import "./styles.css";
import Front from "../front/Front";
import Top2 from "../Navbar/Top2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage } from "../../utils/firebase";
import addUser from "../../api/addUser";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context";
import { Link } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Hospital_signup() {
    const { address } = useContext(AuthContext);
    const [state, setState] = useState({
        name: "",
        city: "Karachi",
        phone: "",
        email: "",
        addressArea: "",
        errMsg: "",
        succMsg: "",
        pass: "",
    });

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        setState((prevState) => ({ ...prevState, errMsg: "" }));

        try {
            if (!address) {
                console.log("wallet connect first");
                alert("Wallet Connect First");
                return;
            }

            const { name, city, phone, email, pass, addressArea } = state;
            const fileInput = event.target.elements.file;

            if (!fileInput || fileInput.files.length === 0) {
                console.error("No file selected");
                return;
            }

            const file = fileInput.files[0];

            if (!file.type.startsWith("image/")) {
                console.error("Please select an image file.");
                return;
            }

            const { user } = await createUserWithEmailAndPassword(auth, email, pass);
            const fileRef = ref(storage, file.name);

            await uploadBytes(fileRef, file);
            const url = await getDownloadURL(fileRef);

            await addUser({
                accessToken: user.accessToken,
                displayName: name,
                email: email,
                city: city,
                phone: phone,
                address: addressArea,
                wallet: address,
                type: "hospital",
                reloadUserInfo: user.reloadUserInfo,
                uid: user.uid,
                photoURL: url,
            });

            navigate("/");
        } catch (error) {
            console.log(error);
            setState((prevState) => ({ ...prevState, errMsg: error.message }));
        }
    };

    const onChange = async (event) => {
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
                                <h2 style={{ color: "white" }}>Hospital Signup</h2>
                            </div>
                            <div className="row clearfix">
                                <div className="">
                                    <form onSubmit={onSubmit}>
                                        <div className="row clearfix">
                                            <div className="input_field select_option">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Hospital Name"
                                                    value={state.name}
                                                    onChange={onChange}
                                                    required
                                                />
                                            </div>
                                        </div>
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
                                                placeholder="Contact number"
                                            />
                                        </div>
                                        <div className="row clearfix">
                                            <div className="input_field select_option">
                                                <input
                                                    type="text"
                                                    name="addressArea"
                                                    placeholder="Address"
                                                    value={state.addressArea}
                                                    onChange={onChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="input_field select_option">
                                            <select
                                                name="city"
                                                placeholder="Choose city"
                                                value={state.city}
                                                onChange={onChange}
                                                required
                                            >
                                                <option>Select a city</option>
                                                <option value="Karachi">Karachi</option>
                                                <option value="Lahore">Lahore</option>
                                                <option value="Islamabad">Islamabad</option>
                                                <option value="Rawalpindi">Rawalpindi</option>
                                                <option value="Peshawar">Peshawar</option>
                                                <option value="Multan">Multan</option>
                                            </select>
                                        </div>
                                        <div className="row clearfix">
                                            <div className="input_field select_option">
                                                <input
                                                    type="file"
                                                    name="file"
                                                    placeholder="Hospital Image"
                                                    value={state.image}
                                                    onChange={onChange}
                                                    required
                                                    style={{ background: "white" }}
                                                    accept="image/png, image/jpeg, image/jpg"
                                                />
                                            </div>
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
                                            Already have an account? <Link to="/hospitallogin"> Login</Link>
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
export default Hospital_signup;
