import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "pages/LandingPage";

import Home from "pages/Home";
import HomeApel from "pages/HomeApel";

import "assets/scss/style.scss";
import { API, setAuthToken } from "config/api";
import Switch from "react-bootstrap/esm/Switch";
import { TaskContext } from "context/TaskContext";
import PrivateRoute from "components/PrivateRoute";

import ScrollToTop from "components/ScrollToTop";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(TaskContext);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get("/auth");

        dispatch({
          type: "USER_LOADED",
          payload: res.data.data.user,
        });
      } catch (err) {
        console.log(err);
        dispatch({
          type: "AUTH_ERROR",
        });
      }
    };

    loadUser();
  }, []);
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/homeapel" component={HomeApel} />
          {/* <PrivateRoute exact path="/home" component={Home} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
