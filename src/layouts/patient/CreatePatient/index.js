import React, { useState } from "react";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import SoftInput from "components/SoftInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useSoftUIController } from "context";
import { EMAIL_REGAX } from "helper/constant";
import { Close, Delete } from "@mui/icons-material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import "./createPatient.css";
import {
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SoftTypography from "components/SoftTypography";
import toast from "react-hot-toast";
function CreatePatient() {
  const [controller] = useSoftUIController();
  const { sidenavColor } = controller;
  const navigate = useNavigate();
  const [generalInfo, setGeneralInfo] = useState({
    lastName: "",
    firstName: "",
    birthdate: "",
    phoneNumber: "",
    email: "",
    profileImage: null,
    hasEmail: "yes",
  });
  const [familyInfo, setFamilyInfo] = useState([
    { relation: "", name: "", email: "", hasEmail: "yes" },
  ]);
  const [medicalHistory, setMedicalHistory] = useState({
    allergies: "",
    chronicConditions: "",
    medications: "",
  });
  const [errors, setErrors] = useState({});
  const [familyErrors, setFamilyErrors] = useState([{}]);
  const [medicalErrors, setMedicalErrors] = useState({});

  const validateGeneralInfo = () => {
    let newErrors = {};
    Object.keys(generalInfo).forEach((key) => {
      if (!generalInfo[key] && key !== "PhoneNumber" && key !== "Email") {
        newErrors[key] = `${key} is required`;
      }
      if (!generalInfo.email) {
        newErrors.email = `Email is required`;
      }
      if (
        generalInfo.email &&
        generalInfo.hasEmail == "yes" &&
        !EMAIL_REGAX?.test(generalInfo.email)
      ) {
        newErrors.email = `Email is not valid`;
      }
      if (!generalInfo.phoneNumber && generalInfo.hasEmail == "no") {
        newErrors.phoneNumber = "PhoneNumber is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateFamilyInfo = () => {
    let valid = true;
    const newFamilyErrors = familyInfo.map((member, index) => {
      let memberErrors = {};
      if (!member.relation) {
        memberErrors.relation = "Relation is required";
        valid = false;
      }
      if (member.relation === "Other" && !member?.otherRelation) {
        memberErrors.otherRelation = "Other Relation is required";
        valid = false;
      }
      if (!member.name) {
        memberErrors.name = "Name is required";
        valid = false;
      }
      if (!member.email && member.hasEmail == "yes") {
        memberErrors.email = "Email is required";
        valid = false;
      } else if (member.email && member.hasEmail == "yes" && !EMAIL_REGAX?.test(member.email)) {
        memberErrors.email = `Email is not valid`;
        valid = false;
      }
      if (!member.phoneNumber && member.hasEmail == "no") {
        memberErrors.phoneNumber = "PhoneNumber is required";
        valid = false;
      }
      return memberErrors;
    });

    setFamilyErrors(newFamilyErrors);
    return valid;
  };

  const validateMedicalHistory = () => {
    let newErrors = {};
    console.log(medicalHistory);
    Object.keys(medicalHistory).forEach((key) => {
      if (!medicalHistory[key]) {
        newErrors[key] = `${key} is required`;
      }
    });
    setMedicalErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGeneralInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFamilyChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFamilyInfo = [...familyInfo];
    updatedFamilyInfo[index][name] = value;
    setFamilyInfo(updatedFamilyInfo);

    const updatedFamilyErrors = [...familyErrors];
    updatedFamilyErrors[index][name] = "";
    setFamilyErrors(updatedFamilyErrors);
  };

  const handleMedicalHistoryChange = (event) => {
    const { name, value } = event.target;
    setMedicalHistory((prev) => ({ ...prev, [name]: value }));
    setMedicalErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const addFamilyMember = () => {
    setFamilyInfo((prev) => [...prev, { relation: "", name: "", email: "", hasEmail: "yes" }]);
    setFamilyErrors((prev) => [...prev, {}]);
  };

  const handleSubmit = () => {
    validateGeneralInfo();
    validateFamilyInfo();
    validateMedicalHistory();
    console.log(validateGeneralInfo() && validateFamilyInfo() && validateMedicalHistory());
    if (validateGeneralInfo() && validateFamilyInfo() && validateMedicalHistory()) {
      if (!familyInfo?.length) {
        toast("Minimum one family member is required!");
        return;
      }

      console.log("Form Submitted", { generalInfo, familyInfo, medicalHistory });
      // Handle form submission logic
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setGeneralInfo((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
    setErrors((prev) => ({ ...prev, profileImage: "" }));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        {" "}
        <Grid item xs={12} display="flex" justifyContent="end" gap="10px">
          <SoftButton
            variant="gradient"
            color={"secondary"}
            onClick={() => {
              navigate("/patients");
            }}
          >
            cancel
          </SoftButton>
          <SoftButton variant="gradient" color={sidenavColor} onClick={handleSubmit}>
            Submit
          </SoftButton>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ marginTop: "20px" }}>
              <SoftBox p={3}>
                {" "}
                <SoftTypography variant="h6" gutterBottom>
                  General Information
                </SoftTypography>{" "}
                <Grid container spacing={2}>
                  {/* Profile Image Upload */}
                  <Grid item xs={12} md={6}>
                    <label>
                      Photo <span>* {errors.profileImage && errors.profileImage}</span>
                    </label>
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <Avatar
                        alt="Profile Image"
                        src={generalInfo.profileImage}
                        sx={{ width: 100, height: 100, mb: 2 }}
                      />
                      <label htmlFor="upload-button">
                        <input
                          accept="image/*"
                          style={{ display: "none" }}
                          id="upload-button"
                          type="file"
                          onChange={handleImageUpload}
                        />
                        <IconButton color="primary" aria-label="upload picture" component="span">
                          <PhotoCamera />
                        </IconButton>
                      </label>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {/* General Info Fields */}
                    <label>
                      First Name <span>* {errors.firstName && errors.firstName}</span>
                    </label>
                    <SoftInput
                      fullWidth
                      label="First name"
                      name="firstName"
                      type="text"
                      value={generalInfo.firstName}
                      onChange={handleInputChange}
                      error={Boolean(errors.firstName)}
                    />
                    <label>
                      Last Name <span>* {errors.lastName && errors.lastName}</span>
                    </label>
                    <SoftInput
                      fullWidth
                      label="Last name"
                      name="lastName"
                      type="text"
                      value={generalInfo.lastName}
                      onChange={handleInputChange}
                      error={Boolean(errors.lastName)}
                    />

                    <label>
                      Date of Birth <span>* {errors.birthdate && errors.birthdate}</span>
                    </label>
                    <SoftInput
                      fullWidth
                      label="Date of birth"
                      name="birthdate"
                      type="date"
                      value={generalInfo.birthdate}
                      onChange={handleInputChange}
                      error={Boolean(errors.birthdate)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl component="fieldset">
                      <label>Do they have an email?</label>
                      <RadioGroup
                        aria-label="hasEmail"
                        name="hasEmail"
                        value={generalInfo.hasEmail}
                        onChange={handleInputChange}
                        sx={{ marginLeft: "10px" }}
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="Yes"
                          color="#66b5a3"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="No"
                          color="#66b5a3"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  {generalInfo.hasEmail === "yes" ? (
                    <Grid item xs={12} md={6}>
                      <label>
                        Email <span>* {errors.email && errors.email}</span>
                      </label>
                      <SoftInput
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={generalInfo.email}
                        onChange={handleInputChange}
                        error={Boolean(errors.email)}
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={12} md={6}>
                      <label>
                        Phone Number <span>* {errors.phoneNumber && errors.phoneNumber}</span>
                      </label>
                      <SoftInput
                        fullWidth
                        label="Phone Number"
                        name="phoneNumber"
                        type="number"
                        value={generalInfo.phoneNumber}
                        onChange={handleInputChange}
                        error={Boolean(errors.phoneNumber)}
                      />
                    </Grid>
                  )}
                </Grid>
              </SoftBox>
            </Card>
            <Card sx={{ marginTop: "20px" }}>
              <SoftBox p={3}>
                {" "}
                <SoftTypography variant="h6" gutterBottom>
                  Medical History
                </SoftTypography>{" "}
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <label>
                      Allergies <span>* {medicalErrors.allergies && medicalErrors.allergies}</span>
                    </label>
                    <SoftInput
                      fullWidth
                      label="Allergies"
                      name="allergies"
                      type="text"
                      value={medicalHistory.allergies}
                      onChange={handleMedicalHistoryChange}
                      error={Boolean(medicalErrors.allergies)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <label>
                      Chronic Conditions{" "}
                      <span>
                        * {medicalErrors.chronicConditions && medicalErrors.chronicConditions}
                      </span>
                    </label>
                    <SoftInput
                      fullWidth
                      label="Chronic conditions"
                      name="chronicConditions"
                      type="text"
                      value={medicalHistory.chronicConditions}
                      onChange={handleMedicalHistoryChange}
                      error={Boolean(medicalErrors.chronicConditions)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <label>
                      Medications{" "}
                      <span>* {medicalErrors.medications && medicalErrors.medications}</span>
                    </label>
                    <SoftInput
                      fullWidth
                      label="Medications"
                      name="medications"
                      type="text"
                      value={medicalHistory.medications}
                      onChange={handleMedicalHistoryChange}
                      error={Boolean(medicalErrors.medications)}
                    />
                  </Grid>
                </Grid>
              </SoftBox>
            </Card>
            <Card sx={{ marginTop: "20px" }}>
              <SoftBox p={3}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <SoftTypography variant="h6" gutterBottom>
                      Family Information
                    </SoftTypography>{" "}
                  </Grid>{" "}
                  <Grid item xs={6} textAlign="end">
                    <SoftButton variant="gradient" color={sidenavColor} onClick={addFamilyMember}>
                      Add Family Member
                    </SoftButton>
                  </Grid>
                </Grid>
                <SoftBox>
                  {familyInfo.map((member, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative", // Enable absolute positioning for child elements
                        border: "0.0625rem solid #d2d6da",
                        borderRadius: "0.5rem",
                        padding: "10px 20px 20px 20px",
                        marginTop: "10px",
                      }}
                    >
                      {/* Delete icon */}
                      <IconButton
                        color="primary"
                        onClick={() => {
                          const updatedFamilyInfo = [...familyInfo];
                          updatedFamilyInfo.splice(index, 1);
                          setFamilyInfo(updatedFamilyInfo);
                          const updatedFamilyErrors = [...familyErrors];
                          updatedFamilyErrors.splice(index, 1);
                          setFamilyErrors(updatedFamilyErrors);
                        }}
                        style={{
                          position: "absolute",
                          top: "0px",
                          right: "0px",
                        }}
                      >
                        <Close />
                      </IconButton>

                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <label htmlFor={`relation-select-${index}`}>
                            Relation
                            <span style={{ color: "red" }}> * {familyErrors[index]?.relation}</span>
                          </label>
                          <select
                            id={`relation-select-${index}`}
                            name="relation"
                            className="relation-dropdown"
                            value={member.relation}
                            onChange={(event) => handleFamilyChange(index, event)}
                            style={{
                              width: "100%",
                              padding: "8px",
                              border: Boolean(familyErrors[index]?.relation)
                                ? "1px solid red"
                                : "1px solid #ccc",
                            }}
                          >
                            <option value="">Select Relation</option>
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Brother">Brother</option>
                            <option value="Sister">Sister</option>
                            <option value="Son">Son</option>
                            <option value="Daughter">Daughter</option>
                            <option value="Wife">Wife</option>
                            <option value="Other">Other</option>
                          </select>
                          {member.relation === "Other" && (
                            <>
                              <label>
                                <span>{familyErrors[index]?.otherRelation}</span>
                              </label>
                              <SoftInput
                                fullWidth
                                label="Specify Relation"
                                name="otherRelation"
                                type="text"
                                value={member.otherRelation || ""}
                                onChange={(event) => handleFamilyChange(index, event)}
                                error={Boolean(familyErrors[index]?.otherRelation)}
                              />
                            </>
                          )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <label>
                            Name <span>* {familyErrors[index]?.name}</span>
                          </label>
                          <SoftInput
                            fullWidth
                            label="Name"
                            name="name"
                            type="text"
                            value={member.name}
                            onChange={(event) => handleFamilyChange(index, event)}
                            error={Boolean(familyErrors[index]?.name)}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl component="fieldset">
                            <label>Do they have an email?</label>
                            <RadioGroup
                              aria-label="hasEmail"
                              name="hasEmail"
                              value={member.hasEmail}
                              onChange={(event) => handleFamilyChange(index, event)}
                              sx={{ marginLeft: "10px" }}
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                                color="#66b5a3"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                                color="#66b5a3"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        {member.hasEmail === "yes" ? (
                          <Grid item xs={12} md={6}>
                            <label>
                              Email{" "}
                              <span>
                                * {familyErrors[index]?.email && familyErrors[index]?.email}
                              </span>
                            </label>
                            <SoftInput
                              fullWidth
                              label="Email"
                              name="email"
                              type="text"
                              value={member.email}
                              onChange={(event) => handleFamilyChange(index, event)}
                              error={Boolean(familyErrors[index]?.email)}
                            />
                          </Grid>
                        ) : (
                          <Grid item xs={12} md={6}>
                            <label>
                              Phone Number{" "}
                              <span>
                                *{" "}
                                {familyErrors[index]?.phoneNumber &&
                                  familyErrors[index]?.phoneNumber}
                              </span>
                            </label>
                            <SoftInput
                              fullWidth
                              label="Phone Number"
                              name="phoneNumber"
                              type="text"
                              value={member.phoneNumber}
                              onChange={(event) => handleFamilyChange(index, event)}
                              error={Boolean(familyErrors[index]?.phoneNumber)}
                            />
                          </Grid>
                        )}
                      </Grid>
                    </div>
                  ))}
                </SoftBox>
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}

export default CreatePatient;
