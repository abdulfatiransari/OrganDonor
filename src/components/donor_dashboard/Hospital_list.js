import React, { useEffect, useState } from "react";
import { Card, Segment, Header, Divider, Grid, Form } from "semantic-ui-react";
import HospitalNav from "../Hospital/Hospital_nav";
import getHospitalList from "../../api/getHospitalList";
import Top3 from "../Navbar/Top3";

const HospitalList = () => {
    const [state, setState] = useState({
        hospitals: [],
        city: "Karachi",
    });

    const fetchHospitalList = async (city) => {
        try {
            const hospitals = await getHospitalList(city);
            setState((prevState) => ({ ...prevState, hospitals }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchHospitalList(state.city);
    }, [state.city]);

    const renderHospitals = () => {
        return (
            <Card.Group
                items={state.hospitals.map((hospital, idx) => ({
                    image: hospital.photoURL,
                    header: hospital.name,
                    meta: hospital.contact,
                    description: hospital.address,
                    key: idx,
                }))}
                centered
            />
        );
    };

    const onChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    return (
        <>
            <HospitalNav />
            <div>
                <Top3 />
                <Grid centered columns={2} style={{ marginTop: "20px" }}>
                    <Grid.Column width={12}>
                        <Segment style={{ background: "#00000080" }}>
                            <Header as="h3" color="grey" style={{ textAlign: "center" }}>
                                Please visit any one hospital from the given list, to get yourself approved! , Select a
                                city to view the hospitals
                            </Header>
                            <Form>
                                <Form.Group
                                    width={1}
                                    style={{
                                        background: "white",
                                        width: "fit-content",
                                        borderRadius: "10px",
                                        paddingTop: "10px",
                                    }}
                                >
                                    <Form.Field
                                        value={state.city}
                                        onChange={onChange}
                                        name="city"
                                        label="City"
                                        control="select"
                                        required
                                        style={{ background: "white" }}
                                    >
                                        <option value="Karachi">Karachi</option>
                                        <option value="Lahore">Lahore</option>
                                        <option value="Islamabad">Islamabad</option>
                                        <option value="Rawalpindi">Rawalpindi</option>
                                        <option value="Peshawar">Peshawar</option>
                                        <option value="Multan">Multan</option>
                                    </Form.Field>
                                </Form.Group>
                            </Form>
                            <Divider />
                            {renderHospitals()}
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        </>
    );
};

export default HospitalList;
