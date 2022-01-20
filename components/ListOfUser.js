import {
  Button,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";
import UserDetailForm from "./UserDetailForm";
import axios from "axios";
import { Router } from "next/router";

const tableStyle = {
  "& .MuiTableCell-head": {
    // "& .MuiTypography-root":{
    fontWeight: 600,
    fontSize: 12,
    // }
  },
  "& .MuiTableCell-body": {
    fontSize: 12,
  },
};

const ListOfUser = ({ tableUserData, route }) => {
  const [formVisibility, setFormVisibility] = useState(false);
  const [formDetails, setFormDetails] = useState({
    formTittle: "",
    formType: "",
    setFormVisibility: `${setFormVisibility}`,
    userInfo: {},
  });

  const handleFormVisibility = () => {
    setFormVisibility(false);
  };
  const handleCreateForm = () => {
    setFormVisibility(true);
    setFormDetails({
      formTittle: "Create New User",
      formType: "Create",
      setFormVisibility: `${setFormVisibility}`,
      userInfo: null,
    });
  };
  const handleEditForm = (e, user) => {
    setFormVisibility(true);
    setFormDetails({
      formTittle: "Update User",
      formType: "Update",
      setFormVisibility: `${setFormVisibility}`,
      userInfo: user,
    });
  };

  const deletUserHandler = async (e, user) => {
    await axios
      .delete(`http://127.0.0.1:3004/users/${user.id}`)
      .then((res) => route.reload())
      .catch((error) => console.error(error));
  };

  return (
    <Grid container gap={2}>
      <Button
        color="info"
        size="small"
        variant="contained"
        endIcon={<AddCircleOutlineIcon />}
        sx={{ textTransform: "none", fontSize: 12 }}
        onClick={handleCreateForm}
      >
        New
      </Button>
      <TableContainer component={Paper} sx={tableStyle}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Operation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableUserData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.designation}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    color="info"
                    endIcon={<EditIcon />}
                    sx={{
                      textTransform: "none",
                      fontSize: 12,
                      marginRight: "4px",
                    }}
                    onClick={(e) => handleEditForm(e, user)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="info"
                    endIcon={<DeleteOutlineIcon />}
                    sx={{ textTransform: "none", fontSize: 12 }}
                    onClick={(e) => deletUserHandler(e, user)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={formVisibility} onClose={handleFormVisibility}>
        <Box
          sx={{
            width: "600px",
            height: "300px",
            position: "absolute",
            top: "25%",
            left: "25%",
          }}
        >
          <UserDetailForm formDetails={formDetails} route={route} />
        </Box>
      </Modal>
    </Grid>
  );
};

export default ListOfUser;
