import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/shared/Header";
import Register from "./components/register/Register";
import Login from "./components/login/Login";

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(localStorage.getItem("user") || "");
  }, []);

  const handleLogOut = () => {
    setUser("");
    localStorage.removeItem("user");
  };
  return (
    <>
      <Router>
        <Header user={user} handleClick={handleLogOut} />
        <Switch>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

export default App;
