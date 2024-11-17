import React, { useState } from "react";
import HospitalNav from "../Hospital/Hospital_nav";
import Top3 from "../Navbar/Top3";

export default function Predict() {
    const [formData, setFormData] = useState({
        age: "",
        blood_pressure: "",
        specific_gravity: "",
        albumin: "",
        sugar: "",
        red_blood_cells: "",
        pus_cell: "",
        pus_cell_clumps: "",
        bacteria: "",
        blood_glucose_random: "",
        blood_urea: "",
        serum_creatinine: "",
        sodium: "",
        potassium: "",
        haemoglobin: "",
        packed_cell_volume: "",
        white_blood_cell_count: "",
        red_blood_cell_count: "",
        hypertension: "",
        diabetes_mellitus: "",
        coronary_artery_disease: "",
        appetite: "",
        peda_edema: "",
        anemia: "",
    });
    const [result, setResult] = useState(null);
    console.log("🚀 ~ Predict ~ result:", result);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [id]: value }));
    };

    const makePrediction = async () => {
        try {
            const obj = {
                age: parseInt(formData.age),
                blood_pressure: Number(formData.blood_pressure),
                specific_gravity: Number(formData.specific_gravity),
                albumin: Number(formData.albumin),
                sugar: Number(formData.sugar),
                red_blood_cells: formData.red_blood_cells,
                pus_cell: formData.pus_cell,
                pus_cell_clumps: formData.pus_cell_clumps,
                bacteria: formData.bacteria,
                blood_glucose_random: parseFloat(formData.blood_glucose_random),
                blood_urea: parseFloat(formData.blood_urea),
                serum_creatinine: parseFloat(formData.serum_creatinine),
                sodium: parseFloat(formData.sodium),
                potassium: parseFloat(formData.potassium),
                haemoglobin: parseFloat(formData.haemoglobin),
                packed_cell_volume: parseFloat(formData.packed_cell_volume),
                white_blood_cell_count: parseFloat(formData.white_blood_cell_count),
                red_blood_cell_count: parseFloat(formData.red_blood_cell_count),
                hypertension: formData.hypertension,
                diabetes_mellitus: formData.diabetes_mellitus,
                coronary_artery_disease: formData.coronary_artery_disease,
                appetite: formData.appetite,
                pedal_edema: formData.peda_edema,
                anemia: formData.anemia,
            };

            // Build query parameters from `obj`
            const queryParams = new URLSearchParams(obj).toString();

            const response = await fetch(`http://127.0.0.1:8000/predict?${queryParams}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });

            console.log(response);
            const result = await response.text();
            console.log("🚀 ~ makePrediction ~ result:", result);
            setResult(result);
            alert(result);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        makePrediction();
    };
    return (
        <>
            <HospitalNav />

            <div>
                <Top3 />
                <div
                    className="container"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        maxHeight: "90vh",
                        overflowY: "scroll",
                    }}
                >
                    <h1 style={{ color: "white", fontWeight: "bold" }}>CKD Prediction System</h1>
                    {/* <form
                        onSubmit={handleSubmit}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: "10px",
                            justifyContent: "space-between",
                        }}
                    >
                        <label
                            style={{ color: "white", display: "flex", justifyContent: "space-between", gap: "20px" }}
                        >
                            Age: <input type="number" id="age" value={formData.age} onChange={handleChange} required />
                        </label>
                        <label
                            style={{ color: "white", display: "flex", justifyContent: "space-between", gap: "20px" }}
                        >
                            Blood Pressure (BP):{" "}
                            <input
                                type="number"
                                id="blood_pressure"
                                value={formData.blood_pressure}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label
                            style={{ color: "white", display: "flex", justifyContent: "space-between", gap: "20px" }}
                        >
                            Specific Gravity (SG):{" "}
                            <input
                                type="number"
                                step="0.01"
                                id="specific_gravity"
                                value={formData.specific_gravity}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label
                            style={{ color: "white", display: "flex", justifyContent: "space-between", gap: "20px" }}
                        >
                            Albumin (AL):{" "}
                            <input
                                type="number"
                                id="albumin"
                                value={formData.albumin}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label
                            style={{ color: "white", display: "flex", justifyContent: "space-between", gap: "20px" }}
                        >
                            Sugar (SU):{" "}
                            <input type="number" id="sugar" value={formData.sugar} onChange={handleChange} required />
                        </label>
                        <label
                            style={{ color: "white", display: "flex", justifyContent: "space-between", gap: "20px" }}
                        >
                            Red Blood Cells (RBC):{" "}
                            <input
                                type="text"
                                id="red_blood_cells"
                                value={formData.red_blood_cells}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label
                            style={{ color: "white", display: "flex", justifyContent: "space-between", gap: "20px" }}
                        >
                            Pus Cells (PC):{" "}
                            <input
                                type="text"
                                id="pus_cell"
                                value={formData.pus_cell}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label
                            style={{ color: "white", display: "flex", justifyContent: "space-between", gap: "20px" }}
                        >
                            Pus Cell Clumps (PCC):{" "}
                            <input
                                type="text"
                                id="pus_cell_clumps"
                                value={formData.pus_cell_clumps}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label
                            style={{ color: "white", display: "flex", justifyContent: "space-between", gap: "20px" }}
                        >
                            Bacteria (BA):{" "}
                            <input
                                type="text"
                                id="bacteria"
                                value={formData.bacteria}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label
                            style={{ color: "white", display: "flex", justifyContent: "space-between", gap: "20px" }}
                        >
                            Blood Glucose Random (BGR):{" "}
                            <input
                                type="number"
                                id="blood_glucose_random"
                                value={formData.blood_glucose_random}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label
                            style={{ color: "white", display: "flex", justifyContent: "space-between", gap: "20px" }}
                        >
                            Blood Urea (BU):{" "}
                            <input
                                type="number"
                                id="blood_urea"
                                value={formData.blood_urea}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label
                            style={{ color: "white", display: "flex", justifyContent: "space-between", gap: "20px" }}
                        >
                            Serum Creatinine (SC):{" "}
                            <input
                                type="number"
                                id="serum_creatinine"
                                value={formData.serum_creatinine}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label
                            style={{ color: "white", display: "flex", justifyContent: "space-between", gap: "20px" }}
                        >
                            Sodium (SOD):{" "}
                            <input type="number" id="sodium" value={formData.sodium} onChange={handleChange} required />
                        </label>
                        <label
                            style={{ color: "white", display: "flex", justifyContent: "space-between", gap: "20px" }}
                        >
                            Potassium (POT):{" "}
                            <input
                                type="number"
                                id="potassium"
                                value={formData.potassium}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label
                            style={{ color: "white", display: "flex", justifyContent: "space-between", gap: "20px" }}
                        >
                            Hemoglobin (HEMO):{" "}
                            <input
                                type="number"
                                id="haemoglobin"
                                value={formData.haemoglobin}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label
                            style={{ color: "white", display: "flex", justifyContent: "space-between", gap: "20px" }}
                        >
                            Packed Cell Volume (PCV):{" "}
                            <input
                                type="number"
                                id="packed_cell_volume"
                                value={formData.packed_cell_volume}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label
                            style={{ color: "white", display: "flex", justifyContent: "space-between", gap: "20px" }}
                        >
                            White Blood Cell Count (WBCC):{" "}
                            <input
                                type="number"
                                id="white_blood_cell_count"
                                value={formData.white_blood_cell_count}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label
                            style={{ color: "white", display: "flex", justifyContent: "space-between", gap: "20px" }}
                        >
                            Red Blood Cell Count (RBCC):{" "}
                            <input
                                type="number"
                                id="red_blood_cell_count"
                                value={formData.red_blood_cell_count}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <Button positive type="submit" style={{}}>
                            Predict
                        </Button>
                    </form> */}
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: "20px",
                            width: "100%",
                            marginTop: "10px",
                        }}
                    >
                        {[
                            { label: "Age", id: "age", type: "number" },
                            { label: "Blood Pressure (BP)", id: "blood_pressure", type: "number" },
                            { label: "Specific Gravity (SG)", id: "specific_gravity", type: "number", step: "0.01" },
                            { label: "Albumin (AL)", id: "albumin", type: "number" },
                            { label: "Sugar (SU)", id: "sugar", type: "number" },
                            { label: "Red Blood Cells (RBC)", id: "red_blood_cells", type: "text" },
                            { label: "Pus Cells (PC)", id: "pus_cell", type: "text" },
                            { label: "Pus Cell Clumps (PCC)", id: "pus_cell_clumps", type: "text" },
                            { label: "Bacteria (BA)", id: "bacteria", type: "text" },
                            { label: "Blood Glucose Random (BGR)", id: "blood_glucose_random", type: "number" },
                            { label: "Blood Urea (BU)", id: "blood_urea", type: "number" },
                            { label: "Serum Creatinine (SC)", id: "serum_creatinine", type: "number" },
                            { label: "Sodium (SOD)", id: "sodium", type: "number" },
                            { label: "Potassium (POT)", id: "potassium", type: "number" },
                            { label: "Hemoglobin (HEMO)", id: "haemoglobin", type: "number" },
                            { label: "Packed Cell Volume (PCV)", id: "packed_cell_volume", type: "number" },
                            { label: "White Blood Cell Count (WBCC)", id: "white_blood_cell_count", type: "number" },
                            { label: "Red Blood Cell Count (RBCC)", id: "red_blood_cell_count", type: "number" },
                        ].map((field) => (
                            <label
                                key={field.id}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    color: "white",
                                    fontSize: "16px",
                                }}
                            >
                                {field.label}
                                <input
                                    type={field.type}
                                    id={field.id}
                                    value={formData[field.id]}
                                    onChange={handleChange}
                                    required
                                    step={field.step || undefined}
                                    style={{
                                        marginTop: "5px",
                                        padding: "8px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                    }}
                                />
                            </label>
                        ))}
                        <button
                            type="submit"
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#28a745",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "16px",
                                fontWeight: "bold",
                            }}
                        >
                            Predict
                        </button>
                    </form>
                    <div id="result">Prediction: {result}</div>
                </div>
                {result && (
                    <div>
                        <p
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                color: "white",
                                fontSize: "20px",
                                fontWeight: "bold",
                            }}
                        >
                            Prediction: {result}
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
