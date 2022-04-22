import React, { useState, useEffect } from "react";
import { TextField, Container, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      return <div>Loading...</div>;
    }
  }, [user, loading]);

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "100px",
        boxShadow: "5px 10px 18px #888888",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Login to Come&Buy</h1>
      <div
        style={{ marginTop: "5px", display: "flex", flexDirection: "column" }}
      >
        <Button
          variant="contained"
          style={{ backgroundColor: "#4285F4", color: "white", marginBottom :10 }}
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </Button>
       
      </div>
    </Container>
  );
};

export default LoginForm;
