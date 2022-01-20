import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const formStyle = {
  // "& .MuiOutlinedInput-root":{
  //     width:"80%"
  // }
  padding: "16px",
};

const url = "http://127.0.0.1:3004/users";

const UserDetailForm = ({ formDetails, route }) => {
  const initialState = {
    name: formDetails.userInfo ? formDetails.userInfo.name : "",
    email: formDetails.userInfo ? formDetails.userInfo.email : "",
    designation: formDetails.userInfo ? formDetails.userInfo.designation : "",
  };

  const [formValues, setFormValues] = useState(initialState);

  const handleChange = (e) => {
    // console.log("event handler", e.target.value);
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    if (formDetails.formType === "Create") {
      console.log("=== form values === ", formValues);
      await axios
        .post(url, formValues)
        .then((res) => route.reload())
        .catch((err) => console.error(err));
    } else if (formDetails.formType === "Update") {
      console.log("=== user id== ", formDetails.userInfo.id);
      await axios
        .put(url + `/${formDetails.userInfo.id}`, {
          id: formDetails.userInfo.id,
          ...formValues,
        })
        .then((res) => route.reload())
        .catch((err) => console.error(err));
    }
  };

  return (
    <Paper sx={formStyle}>
      <Grid container gap={2}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: (theme) => theme.palette.info.main }}
        >
          {formDetails.formTittle}
        </Typography>
        <TextField
          name="name"
          size="small"
          value={formValues.name}
          fullWidth={true}
          label="name"
          onChange={handleChange}
        ></TextField>
        <TextField
          name="email"
          size="small"
          fullWidth={true}
          value={formValues.email}
          label="email"
          onChange={handleChange}
        ></TextField>
        <TextField
          name="designation"
          size="small"
          value={formValues.designation}
          onChange={handleChange}
          fullWidth={true}
          label="designation"
        ></TextField>
        <Button
          variant="contained"
          color="info"
          size="small"
          sx={{ textTransform: "none" }}
          onClick={submitForm}
        >
          {formDetails.formType}
        </Button>
      </Grid>
    </Paper>
  );
};

export default UserDetailForm;
