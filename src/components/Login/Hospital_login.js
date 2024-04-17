import React, { useContext, useState } from "react";
import Top2 from "../Navbar/Top2";
import "./styles.css";
import { Message } from "semantic-ui-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import getUser from "../../api/getUser";
import { AuthContext } from "../Context";
import { useNavigate } from "react-router-dom";

const Hospital_login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const { setCurrentUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        setErrMsg("");

        const user = { email, password };

        signInWithEmailAndPassword(auth, user.email, user.password)
            .then(async ({ user }) => {
                const firebaseuser = await getUser(user.uid);
                if (firebaseuser) {
                    setCurrentUser({
                        ...firebaseuser.data(),
                        id: firebaseuser.id,
                    });
                    console.log({ ...firebaseuser.data(), id: firebaseuser.id });
                    console.log("success");
                    navigate("/");
                }
            })
            .catch((err) => setErrMsg(err.message));
    };

    const onChange = (event) => {
        if (event.target.name === "email") {
            setEmail(event.target.value);
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
        }
    };

    return (
        <>
            <div style={{ background: "#000000", minHeight: "100vh" }}>
                <Top2 />
                <section className="hospital_login" style={{ marginTop: "60px" }}>
                    <div
                        className="px-4 py-5 px-md-5 text-center text-lg-start"
                        // style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
                    >
                        <div className="container">
                            <div className="row gx-lg-5 align-items-center">
                                <div className="col-lg-6 mb-5 mb-lg-0">
                                    <h1 className="my-5 display-3 fw-bold ls-tight">
                                        <span className="text-primary">Signup For hospital Login</span>
                                    </h1>
                                    <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                                        "Organ donation is an act of extraordinary generosity, kindness and humanity. It
                                        is an opportunity for each of us to give the greatest gift of all - the gift of
                                        life. When we choose to become organ donors, we give the ultimate expression of
                                        love and compassion to our fellow human beings. We create a legacy of hope, of
                                        healing, and of new beginnings for those who are desperately waiting for a
                                        second chance at life." - Alexander T. Nguyen
                                    </p>
                                </div>

                                <div className="col-lg-6 mb-5 mb-lg-0">
                                    <div className="card">
                                        <div className="card-body py-5 px-md-5">
                                            <form onSubmit={onSubmit} error={!!errMsg}>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        className="form-control"
                                                        value={email}
                                                        onChange={onChange}
                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="email">
                                                        Email
                                                    </label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        className="form-control"
                                                        value={password}
                                                        onChange={onChange}
                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="form3Example4">
                                                        Password
                                                    </label>
                                                </div>

                                                <button type="submit" className="btn btn-primary btn-block mb-4">
                                                    Sign up
                                                </button>
                                            </form>
                                            {errMsg && errMsg.length > 0 ? (
                                                <Message error header="Oops!!" content={errMsg} />
                                            ) : (
                                                <div />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Hospital_login;
