/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useState } from "react";
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
import SignupMentee from "./Components/Signup/SignupMentee";
import Signupmentor from "./Components/Signup/Signupmentor";
import PrivateRouteWrapper from "./Components/PrivateRoute";
import Profile from "./Components/Profile/Profile";
import BrowseMentor from "./Components/BrowseMentor/BrowseMentor";
import Loader from "./Components/Loader/Loader";
import MentorView from "./Components/Profile/MentorView"


const App = () =>
{

  const [tabSelected, setTabSelected] = useState("home");


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
      {/* {(menteeState.loading || mentorsState.loading) && <Loader/>} */}
      <Loader/>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<PrivateRouteWrapper />}>
              <Route index element={<Home />} />
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/browsementor" element={<BrowseMentor />} />
              <Route path="/browsementor/:userID" element={<MentorView />} />
            </Route>
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
