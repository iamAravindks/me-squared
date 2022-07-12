import React, { useEffect, useState } from 'react'
import './App.css'
import Header from "./Components/Header/Header"
import { BrowserRouter as Router, Route,Routes} from "react-router-dom"
import Home from "./Components/Home/Home"

const App = () =>
{
  const [tabSelected, setTabSelected] = useState("home");
  const [path,setPath]=useState(window.location.pathname)
  useEffect(() => {
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
        </Routes>
      </Router>
    </>
  );
}

export default App  