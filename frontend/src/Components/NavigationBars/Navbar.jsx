import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
export const Navbar = () => {

    const [click,setClick]=useState(false);

    const handleClick=()=>setClick(!click);

    // on Scroll a page then change the position of navbar
    const NavbarAnimation = () => {
        window.addEventListener("scroll", () => {
            let pointY = window.pageYOffset;
            let Navbar = document.getElementById("navbar")
            console.log(window.pageYOffset);
            if (pointY > 80) {
                // change the css
                Navbar.style.position = "fixed";
                Navbar.style.backgroundColor = "#fff"
            } else {
                Navbar.style.position = "absolute"
                Navbar.style.backgroundColor = "";
            }
        })
    }

    return <>

        <header className="navbar-header" id="navbar">
            <nav className="navbar-nav">
                <div className="navbar-logo"><div className="icon"><i></i></div><div className="logo-text"><span><span className="first-char">s</span>hubh</span>dev</div></div>
                <div className={click?"navbar-menus active-sidebar":"navbar-menus"}  id="side-bar">
                    <ul >
                        <li onClick={handleClick}><a  href="#home-component" className="nav-link">home</a></li>
                        <li onClick={handleClick}><a  href="#projects-component" className="nav-link">projects</a></li>
                        <li onClick={handleClick}><a  href="#services-component" className="nav-link">services</a></li>
                        <li onClick={handleClick}><a  href="#about-component" className="nav-link">about</a></li>
                        <li onClick={handleClick}><a href="#contact-component" className="nav-link">contact</a></li>
                    </ul>

                </div>

            </nav>
            <div className="event" onClick={handleClick}>
                <i className={click?"uil uil-times":"uil uil-bars"}></i>
            </div>
        </header>
    </>
}