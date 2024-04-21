import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Segment, Header, Divider, Grid, Form, Button } from "semantic-ui-react";
import Top2 from "../Navbar/Top2";

const HospitalList = () => {
    const [state, setState] = useState({
        hospitals: [],
        city: "",
    });

    const onCheck = () => {
        axios
            .get(`http://localhost:5002/api/hospitals/${state.city}`)
            .then((res) => {
                const hospitals = res.data.map((hospital) => ({
                    address: `Address : ${hospital.address}`,
                    city: hospital.city,
                    name: hospital.username,
                    img: `../../images/${hospital.img}`,
                }));
                setState({ ...state, hospitals });
            })
            .catch((err) => console.log("Error:" + err));
    };

    const onCheckDummy = () => {
        let dummyHospitals = [];

        // Create dummy hospitals based on the selected city
        switch (state.city) {
            case "Karachi":
                dummyHospitals = [
                    {
                        address: "123 Main St",
                        city: "Karachi",
                        name: "Karachi Hospital",
                        img: "../../images/hospital1.jpg",
                        contact: "123-456-7890",
                    },
                    {
                        address: "123 Main St",
                        city: "Karachi",
                        name: "Karachi Hospital",
                        img: "../../images/hospital1.jpg",
                        contact: "123-456-7890",
                    },
                    {
                        address: "123 Main St",
                        city: "Karachi",
                        name: "Karachi Hospital",
                        img: "../../images/hospital1.jpg",
                        contact: "123-456-7890",
                    },
                    {
                        address: "123 Main St",
                        city: "Karachi",
                        name: "Karachi Hospital",
                        img: "../../images/hospital1.jpg",
                        contact: "123-456-7890",
                    },
                    // Add more dummy hospitals for Karachi as needed
                ];
                break;
            case "Lahore":
                dummyHospitals = [
                    {
                        address: "456 Elm St",
                        city: "Lahore",
                        name: "Lahore Hospital",
                        img: "../../images/hospital2.jpg",
                        contact: "456-789-0123",
                    },
                    {
                        address: "456 Elm St",
                        city: "Lahore",
                        name: "Lahore Hospital",
                        img: "../../images/hospital2.jpg",
                        contact: "456-789-0123",
                    },
                    {
                        address: "456 Elm St",
                        city: "Lahore",
                        name: "Lahore Hospital",
                        img: "../../images/hospital2.jpg",
                        contact: "456-789-0123",
                    },
                    {
                        address: "456 Elm St",
                        city: "Lahore",
                        name: "Lahore Hospital",
                        img: "../../images/hospital2.jpg",
                        contact: "456-789-0123",
                    },
                    // Add more dummy hospitals for Lahore as needed
                ];
                break;
            case "Islamabad":
                dummyHospitals = [
                    {
                        address: "456 Elm St",
                        city: "Islamabad",
                        name: "Islamabad Hospital",
                        img: "../../images/hospital2.jpg",
                        contact: "456-789-0123",
                    },
                    // Add dummy hospitals for Islamabad
                ];
                break;
            default:
                // Handle default case if no city is selected
                break;
        }

        setState({ ...state, hospitals: dummyHospitals });
    };

    const renderHospitals = () => {
        return (
            <Card.Group
                items={state.hospitals.map((hospital, idx) => ({
                    image: hospital.img,
                    header: hospital.name,
                    meta: hospital.contact, // Make sure to provide the contact information here
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

    useEffect(() => {
        onCheckDummy();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.city]);

    return (
        <>
            <Top2 />
            <Grid centered columns={2} style={{ marginTop: "20px" }}>
                <Grid.Column width={12}>
                    <Segment style={{ background: "#00000080" }}>
                        <Header as="h3" color="grey" style={{ textAlign: "center" }}>
                            Please visit any one hospital from the given list, to get yourself approved! , Select a city
                            to view the hospitals
                        </Header>
                        <Form onSubmit={onCheck}>
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
                                </Form.Field>
                            </Form.Group>
                            {/* <Button positive type="submit">
                                Check
                            </Button> */}
                        </Form>
                        <Divider />
                        {renderHospitals()}
                    </Segment>
                </Grid.Column>
            </Grid>
        </>
    );
};

export default HospitalList;
