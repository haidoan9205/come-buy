import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductListing from "./containers/ProductListing";
import Header from "./containers/Header";
import "./App.css";
import ProductDetails from "./containers/ProductDetails";
import ProductForm from "./containers/ProductForm";
import LoginForm from "./containers/LoginForm";
import Register from "./containers/Register";
import Reset from "./containers/Reset";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={ProductListing} />
          <Route path="/product/:productId" component={ProductDetails} />
          <Route path="/add-new-product" component={ProductForm}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/reset" component={Reset}></Route>
          <Route>404 Not Found!</Route>
        </Switch>
      </Router>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}

export default App;
