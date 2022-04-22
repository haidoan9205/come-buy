import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import ProductForm from "./ProductForm";
import { Button, Grid } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import { signInWithGoogle } from "../firebase";
const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const history = useHistory();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return history.push("/");
    fetchUserName();
  }, [user, loading]);
  return (
    <div className="ui fixed menu">
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
        }}
        className="ui container center"
      >
        <Link to={"/"}>
          <h2>Come&Buy</h2>
        </Link>
        <div style={{display: 'flex'}}>
        {!name ? (
          <div></div>
        ) : (
          <Link to={"/add-new-product"} style={{marginRight: 10}}>
            <Button style={{color: '#4285F4', border:'1px solid #4285F4'}} variant="outlined">Add new Product</Button>
          </Link>
        )}

        <div>
          {!name ? (
            <Button
              style={{ backgroundColor: "#4285F4", color: "white" }}
              variant="contained"
              onClick={signInWithGoogle}
            >
              Login
            </Button>
          ) : (
            <div>
                welcome <span style={{fontWeight: 'bold'}}>{name}</span> 
              <Button style={{marginLeft: 10}} variant="outlined" onClick={logout}>
                Logout
              </Button>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
