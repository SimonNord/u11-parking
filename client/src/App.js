import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path='/about' component={About}>
            <About />
          </Route>
          <Route path='/login' component={Login}>
            <Login />
          </Route>
          <Route path='/register' component={Register}>
            <Register />
          </Route>
          <Route exact path='/' component={Home}>
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

function Register() {
  return <h2>Register Form</h2>;
}

function Login() {
  return <h2>Login Form</h2>;
}

export default App;
