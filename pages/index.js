import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ListOfUser from "../components/ListOfUser";
import { Box } from "@mui/system";
import axios from "axios";
import { useRouter } from "next/router";

const style = {
  minWidth: "100vw",
  minHeight: "100vh",
  backgroundImage: `linear-gradient(to right bottom, #bb2482, #c01495, #c201ab, #be00c3, #b411de)`,
};

export default function Index({ tableUserData }) {
  const route = useRouter();

  return (
    <Box sx={style}>
      <Container maxWidth="sm">
        <Typography
          variant="h5"
          sx={{
            paddingTop: "50px",
            paddingBottom: "25px",
            fontWeight: 600,
            color: "white",
          }}
        >
          Nextjs & MUI:- CURD table
        </Typography>
        <ListOfUser tableUserData={tableUserData} route={route} />
      </Container>
    </Box>
  );
}

export const getServerSideProps = async () => {
  var tableUserData = [];
  await axios
    .get("http://127.0.0.1:3004/users")
    .then((res) => (tableUserData = res.data))
    .catch((error) => console.log(error));
  return {
    props: { tableUserData },
  };
};
