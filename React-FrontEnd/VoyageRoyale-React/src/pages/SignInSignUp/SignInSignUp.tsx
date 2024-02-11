import  { useState } from "react";
import SignIn from "../../components/Login/SignIn";
import SignUp from "../../components/Login/SignUp";
import Grid from "@mui/material/Grid";
import tokenService from "../../services/tokenService";
import CorporateSignUp from "../../components/Login/CorporateSignUp";

function SignInSignUp() {
  return (
    <Grid container spacing={1} sx={{ padding: "50px", margin:2 }}>
      <Grid item xs={6}>
        <SignIn />
      </Grid>
      <Grid item xs={6}>
        <SignUp />
      </Grid>
      <Grid item xs={6}>
        <CorporateSignUp />
      </Grid>
    </Grid>
  );
}

export default SignInSignUp;
