import { Outlet } from "react-router-dom"
import { IndexComponent } from "../IndexComponents/IndexComponent"
import { Navbar } from "../NavigationBars/Navbar"

export const Dashboard=()=>{
    return <>
        <Navbar/>

        <section className="dynamic-components-container">
       
            <Outlet/>
           
        </section>
    </>
}