"use client";
import NavBar from "./components/NavBar";
import ReactDOM from "react-dom/client"
import {BrowserRouter, Routes, Route} from "react-router-dom"

export default function Index() {
  return (
    <div>
   <BrowserRouter>
    <Routes>
      <Route path="/"/>
    </Routes>
   </BrowserRouter>

   {/* <NavBar/> */}


   </div>
  );
}

//ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)