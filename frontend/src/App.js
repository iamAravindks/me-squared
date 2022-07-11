import React, { useContext, useEffect, useState } from 'react'
import './App.css'
import Header from "./Components/Header/Header"
import { BrowserRouter as Router, Route,Routes} from "react-router-dom"
import Home from "./Components/Home/Home"
import Login from "./Components/Login/Login"
import Signup from "./Components/Signup/Signup"
import { MentorContext } from "./context/mentorContext/Context"



const App = () =>
{

  const { mentorsState, getMentors } = useContext(MentorContext);

  const [tabSelected, setTabSelected] = useState("home");
  const [path,setPath]=useState(window.location.pathname)
  useEffect(() =>
  {
    console.log(mentorsState)
    getMentors()
    setPath(window.location.pathname);
    if (path === "/") setTabSelected("home")
    else if(path==="/products") setTabSelected("products")
    console.log(path)

  }, [tabSelected,path]);
  return (
    <>
      <Router>
        <Header tabSelected={tabSelected} setTabSelected={setTabSelected} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App  