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
import DonorList from "./components/donorList";
import NeedyList from "./components/needyList";
import Hospitalsignup from "./components/Login/Hospital_signup";
import Predict from "./components/Predict/Predict";
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
                    <Route
                        exact
                        path="/dashboard"
                        element={!currentUser ? <Navigate to="/hospitallogin" /> : <Mainpage />}
                    />

                    <Route
                        exact
                        path="/dashboard/approvedonor"
                        element={!currentUser ? <Navigate to="/hospitallogin" /> : <ApproveDonor />}
                    />
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
                    <Route
                        exact
                        path="/dashboard/registerrecipient"
                        element={!currentUser ? <Navigate to="/hospitallogin" /> : <RegisterRecipient />}
                    />
                    <Route
                        exact
                        path="/dashboard/transplantmatch"
                        element={!currentUser ? <Navigate to="/hospitallogin" /> : <TransplantMatch />}
                    />
                    <Route exact path="/hospitalsignup" element={<Hospitalsignup />} />
                    <Route exact path="/dashboard/hospitallist" element={<HospitalList />} />
                    <Route exact path="/dashboard/donorlist" element={<DonorList />} />
                    <Route exact path="/dashboard/needylist" element={<NeedyList />} />
                    <Route exact path="/dashboard/predict" element={<Predict />} />
                </Routes>
            </AuthContext.Provider>
        </>
    );
}

export default App;
