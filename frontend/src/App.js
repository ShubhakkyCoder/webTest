import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import  {IndexComponent } from "./Components/IndexComponents/IndexComponent"
import { Navbar } from "./Components/NavigationBars/Navbar"
import "./Components/NavigationBars/Navbar.css"
import "./Components/IndexComponents/IndexComponent.css"
import "./Components/Footer/FooterComponent.css"
import "./Components/Dashboard/Dashboard.css"
import "./Components/LearningResources/LearningResourcesComponent.css"
import { LearningResourcesComponent } from "./Components/LearningResources/LearningResourcesComponent"
import { Dashboard } from "./Components/Dashboard/Dashboard"
export const  App=()=>{
  return <>
  <BrowserRouter>
  
    <Routes>
    
        <Route path="/" element={<Dashboard/>}>
        <Route path="" element={<IndexComponent/>}/>
        <Route path="shubh/resources" element={<LearningResourcesComponent/>}/>
        </Route>
        
       
    </Routes>
  </BrowserRouter>
    
  </>
}