import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Loginsignup from "./components/Login/Login_sigup";
import Landingpage from "./components/Login/Landing_page";
import Hospitallogin from "./components/Login/Hospital_login";
import Needysignup from "./components/Login/Needy_signup";
import Home from "./components/Home";
import Donorlogin from "./components/Login/Donor_login";
import ApproveDonor from "./components/Hospital/Approve_donor";
// import Hospital_nav from './components/Hospital/Hospital_nav';
import Mainpage from "./components/Hospital/Main";
import PatientRecord from "./components/Hospital/Patient_list";
import RegisterRecipient from "./components/Hospital/Register_recipient";
import HospitalList from "./components/donor_dashboard/Hospital_list";
import TransplantMatch from "./components/Hospital/transplant-match";
import { AuthContext } from "./components/Context";
import { useState } from "react";
import Needylogin from "./components/Login/Needy_login";
function App() {
    const [currentUser, setCurrentUser] = useState();
    const [address, setAddress] = useState("");
    return (
        <>
            <AuthContext.Provider value={{ currentUser, setCurrentUser, address, setAddress }}>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<Landingpage />} />
                    <Route exact path="/donorregister" element={<Loginsignup />} />
                    <Route exact path="/needyregister" element={<Needysignup />} />
                    <Route exact path="/needylogin" element={<Needylogin />} />
                    <Route exact path="/hospitallogin" element={<Hospitallogin />} />
                    <Route exact path="/donorlogin" element={<Donorlogin />} />
                    {/* dummy */}
                    <Route exact path="/dashboard" element={<Mainpage />} />
                    {/* <Route
                    exact
                    path="/Main_page"
                    element={
                        window.localStorage.getItem("isAuthenticated") ? (
                            <Mainpage />
                        ) : (
                            <Navigate to="/hospitallogin" />
                        )
                    }
                /> */}
                    <Route exact path="/dashboard/approvedonor" element={<ApproveDonor />} />
                    {/* <Route
                    exact
                    path="/Approve_donor"
                    element={
                        window.localStorage.getItem("isAuthenticated") ? (
                            <ApproveDonor />
                        ) : (
                            <Navigate to="/hospitallogin" />
                        )
                    }
                /> */}
                    <Route exact path="/patientlist" element={<PatientRecord />} />
                    {/* <Route
                    exact
                    path="/Patient_list"
                    element={
                        window.localStorage.getItem("isAuthenticated") ? (
                            <PatientRecord />
                        ) : (
                            <Navigate to="/hospitallogin" />
                        )
                    }
                /> */}
                    <Route exact path="/dashboard/registerrecipient" element={<RegisterRecipient />} />
                    {/* <Route
                    exact
                    path="/RegisterRecipient"
                    element={
                        window.localStorage.getItem("isAuthenticated") ? (
                            <RegisterRecipient />
                        ) : (
                            <Navigate to="/hospitallogin" />
                        )
                    }
                /> */}
                    <Route exact path="/dashboard/transplantmatch" element={<TransplantMatch />} />
                    {/* <Route
                    exact
                    path="/Transplant_match"
                    element={
                        window.localStorage.getItem("isAuthenticated") ? (
                            <TransplantMatch />
                        ) : (
                            <Navigate to="/hospitallogin" />
                        )
                    }
                /> */}

                    <Route exact path="/hospitallist" element={<HospitalList />} />
                </Routes>
            </AuthContext.Provider>
        </>
    );
}

export default App;
