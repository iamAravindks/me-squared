import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import { MentorContext } from "./context/mentorContext/Context";
import SignupMentee from "./Components/Signup/SignupMentee";
import Signupmentor from "./Components/Signup/Signupmentor";

const App = () => {
  const { mentorsState, getMentors } = useContext(MentorContext);

  const [tabSelected, setTabSelected] = useState("home");
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    console.log(mentorsState);
    getMentors();
    setPath(window.location.pathname);
    if (path === "/") setTabSelected("home");
    else if (path === "/products") setTabSelected("products");
    console.log(path);
  }, [tabSelected, path]);

  const Layout = () => {
    return (
      <>
        <Header tabSelected={tabSelected} setTabSelected={setTabSelected} />
        <Outlet />
      </>
    );
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signupmentee" element={<SignupMentee />} />
          <Route path="/signupmentor" element={<Signupmentor />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
