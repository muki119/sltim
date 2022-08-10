import  React,{Suspense,lazy, useState,useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  useSearchParams,
  Routes,
  Navigate
} from "react-router-dom";
import Landing from "./Landing/Landing.js"
import { CircularProgress } from "@mui/material";
import {ThemeContext} from "./ThemeContext.js";
const Register = lazy(()=> import("./register/register.js") )
const Login =lazy(()=> import('./Login/login.js')); // goes to the login page 
const Dashboard = lazy(()=> import("./Dashboard/dashboard.js")) // goes to dashboard
const Profile = lazy(()=>import("./ProfileViewer/profile.js"))

function App() {
  const [currentTheme,setcurrentTheme] = useState("light")
  const setcurrentThemeFunc = ()=>{
    if (currentTheme === null ){ // if its device choice - go to light mode
      setcurrentTheme("light")
    }else if(currentTheme === "light"){ // if its light mode go to dark mode
      setcurrentTheme("dark")
    }else{ // if its darkmode - go to device choice 
      setcurrentTheme(null)
    }
  }
  useEffect(()=>{
    document.body.setAttribute("color-scheme",currentTheme)
  },[currentTheme])
  return (
    <>
    <Router>
      <ThemeContext.Provider value={{currentTheme,setcurrentThemeFunc}}>
        <Suspense fallback={<Circ/>}>
          <Routes>  
            <Route exact path="/" element={<Landing/>}/> {/** url routes  */}
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path ='/dashboard' element = {<Dashboard/>}/>  {/** url/dashboard */}
            <Route exact path ='/profile' element={<Profile/>}/>
            <Route path="*" element={<Fof/>}/>
          </Routes>
        </Suspense>
      </ThemeContext.Provider>
    </Router>
    </>
  );
}


function Fof () { 

  return(
    <>
    <h1>
      404 Requested resource cannot be found.
    </h1>
    </>
  )
 }

function Circ (){
  return(
    <div id = "circ">
      <CircularProgress size= {"3rem"} sx={{color:"#39386e"}}/>
    </div>
  )
}

export default App;
