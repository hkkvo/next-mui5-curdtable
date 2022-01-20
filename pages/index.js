import { Button, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  const inlineStyle = {
    container: {
      backgroundColor: "red",
    },
  };

  return (
    <div className={inlineStyle.container}>
      <Typography variant="h6">Welcome to Nextjs and MUI</Typography>
      <Button variant="contained">Click</Button>
    </div>
  );
}
