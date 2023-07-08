import { Navbar } from "../NavigationBars/Navbar"
import Swal from "sweetalert2"
import $ from 'jquery';
import { Link } from "react-router-dom";
import axios from "axios"
import lightGallery from 'lightgallery';
import { Toolbar } from "@fancyapps/ui/dist/panzoom/panzoom.toolbar.esm.js";
import "@fancyapps/ui/dist/panzoom/panzoom.toolbar.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import ClockLoader from "react-spinners/ClockLoader"
import PulseLoader from "react-spinners/PulseLoader";
import BounceLoader from "react-spinners/BounceLoader";
import ClipLoader from "react-spinners/ClipLoader";
// Plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import MoonLoader from "react-spinners/MoonLoader"
import { Fancybox, Panzoom } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { FooterComponent } from "../Footer/FooterComponent";
import { useEffect, useState, CSSProperties } from "react";

const defaultObj = {
    name: "",
    subject: "",
    mobile: "",
    email: "",
    message: ""
}

export const IndexComponent = () => {


    Fancybox.bind('[data-fancybox=gallery]', {
        Toolbar: {
            display: {
                top: ["zoom"],
                left: ["infobar"],
                middle: [
                    "zoomIn",
                    "zoomOut",
                    "toggle1to1",
                    "rotateCCW",
                    "rotateCW",
                    "flipX",
                    "flipY",
                ],
                right: ["slideshow", "thumbs", "close"],
            },
        },
    });



    const [data, setData] = useState(defaultObj);
    const [nameFieldEmpty, setNameFieldEmpty] = useState(false);
    const [emailFieldEmpty, setEmailFieldEmpty] = useState(false);
    const [mobileFieldEmpty, setMobileFieldEmpty] = useState(false);
    const [subjectFieldEmpty, setSubjectFieldEmpty] = useState(false);
    const [messageFieldEmpty, setMessageFieldEmpty] = useState(false);
    const [emailSendLoader, setEmailSendLoader] = useState(false);
    //   create form fields data and create object
    const formHandler = (e) => {
        let key = e.target.id;
        let value = e.target.value;
        // update an data object
        setData({ ...data, [key]: value })
    }

    //   send the mail to the developer
    const sendMail = async () => {
        if (data.name != "" && data.email != "" && data.mobile != "" && data.subject != "" && data.message != "") {

            // set the validation error variables
            setNameFieldEmpty(false); setEmailFieldEmpty(false);
            setMobileFieldEmpty(false);
            setSubjectFieldEmpty(false); setMessageFieldEmpty(false);

            //    post data in backend
            const URL = 'https://script.google.com/macros/s/AKfycbwo9YXVLvOYaQiyAUJl38VkEcXK6jboEw9G2i7gk-bIiPnhS5r4oYFE7K0gy5Xh925l/exec';

            var loader_layer = document.getElementById("loader-layer");
            var contactBtn = document.getElementById("contact-btn");

            loader_layer.style.display = "block";
            contactBtn.disabled = true;

            // create a form data object
               let formData=new FormData();
                formData.append("Name",data.name);
                formData.append("Email",data.email);
                formData.append("Mobile",data.mobile);
                formData.append("Subject",data.subject);
                formData.append("Message",data.message);
            
            // post the email data
            axios.post(URL, formData).then((response) => {
                var Response=response.data;

                console.log(response);

                if (Response.result=="success") {
                    // display none the loader layer
                    loader_layer.style.display = "none"
                    contactBtn.disabled = false;

                    // success popup after the send mail successfull
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'message sent successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                else if (response.status!=200) {
                    // display none the loader layer
                    loader_layer.style.display = "none"
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '<h5>plese check your internate connection and given details if everything is ok so wait this error is server releted we are solve it in some time</h5>'
                    })
                }
            })
                .catch((err) => {
                    console.log(err)
                })
            // clear the all fields after send mail successfully
            setData(defaultObj);
        }
        else {
            if (data.name == "" && data.email == "" && data.mobile == "" && data.subject == "" && data.message == "") {
                // whent tha all fields is empty so fire an popup
                Swal.fire({
                    icon: 'error',
                    title: 'check details',
                    text: 'please fill all the details',

                })
            } else {
                if (data.name == "") { setNameFieldEmpty(true) } else { setNameFieldEmpty(false) }
                if (data.subject == "") { setSubjectFieldEmpty(true) } else { setSubjectFieldEmpty(false) }
                if (data.mobile == "") { setMobileFieldEmpty(true) } else { setMobileFieldEmpty(false) };
                if (data.email == "") { setEmailFieldEmpty(true) } else { setEmailFieldEmpty(false) }
                if (data.message == "") { setMessageFieldEmpty(true) } else { setMessageFieldEmpty(false) }
            }
        }
    }

    // define the show personal details card event lisner

    const showDetailsCard = () => {
        let card = document.getElementById("details-card");
        // show the details card
        card.style.display = "block"
    }


    // close the details card
    const closeDetailsCard = () => {
        let card = document.getElementById("details-card");
        // show the details card
        card.style.display = "none"
    }

    // handle the scroll bar

    const GotopAnimation = () => {
        const gotopIcon = document.getElementById("gotop-icon")
        window.addEventListener("scroll", () => {
            let pointY = window.pageYOffset;

            console.log(window.pageYOffset);
            if (pointY > 150) {
                // change the css
                gotopIcon.style.display = "flex"

            } else {
                gotopIcon.style.display = "none"

            }
        })
    }

    // about component tabs hovering js
    const handleTabs = (e, tabname) => {
        let tabs = document.querySelectorAll(".tab");
        let tab_contents = document.querySelectorAll(".tab-content");

        tabs.forEach((tab) => {
            tab.classList.remove("active-tab");
        })

        tab_contents.forEach((tabContent) => {
            tabContent.classList.remove("active-tab-content")
        })

        e.target.classList.add("active-tab")
        document.getElementById(tabname).classList.add("active-tab-content")

    }

    // Go top event
    const goTop = () => {
        window.scrollTo(0, 0);
    }


    useEffect(() => {
        // call the gotop animation at the time of scrolling
        GotopAnimation();

    })



    return <>

        <section className="indexpage-background-section"  id="home-component">
            <div className="background" >
                <div className="background-container">
                    <div className="row">
                        <div className="content-part">
                            <h5 className="hii-heading">Hi, I'm</h5>
                            <h1 className="developer-name dev-name">Shubh Choudhary</h1>
                            <h5 className="developer-role">fullstack developer</h5>
                            <div className="developer-intro">
                               I'm a Fullstack Web Developer lives in indore, I am a web designer and
                               backend developer. I make websites,Usually with MERN Stack and Java Stack.
                            </div>
                            <div className="buttons">
                                <button className="button1"><a href={process.env.PUBLIC_URL + "/Documents/ShubhResume.pdf"} download>dowload CV</a></button>
                                <button className="button2" >Contact</button>
                            </div>
                        </div>
                        <div className="image-part">
                            <div className="image-box">
                                <div className="image">
                                    <img src={process.env.PUBLIC_URL + "/Photos/developer.png.png"} alt="image is loading" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="experience-projects-card">
                <div className="experience-projects-container">
                    <div className="item">
                        <div className="logo"><i class="uil uil-check-circle"></i></div>
                        <div className="details">
                            <h3 className="card-title">Fresher</h3>
                            <div className="card-sub-title">experience</div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="item">
                        <div className="logo"><i class="uil uil-notes"></i></div>
                        <div className="details">
                            <h3 className="card-title">5+ projects</h3>
                            <div className="card-sub-title">Completed</div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="item">
                        <div className="logo"><i class="uil uil-graduation-cap"></i></div>
                        <div className="details">
                            <h3 className="card-title">B.tech</h3>
                            <div className="card-sub-title">Computer Science</div>
                        </div>
                    </div>

                </div>
            </div>

        </section>
        {/* end of background */}


        <section className="services-section" id="services-component">
            <div className="services-wrapper">

                <div className="service-header">
                    <h2 className="service-title">services</h2>
                    <h4 className="service-message">i provide wide type of services</h4>
                </div>

                <div className="cards-container" id="swipper" >

                    {/* ---------------- card ---------------- */}
                    <div className="card" id="card">
                        <div className="card-icon"><i class="uil uil-mobile-android"></i></div>
                        <h3 className="card-title">app developement</h3>
                        <p className="card-text">
                            I am a app developer I make Apps in React Native and i make some apps like calculator
                            ,corona pations tracker,study material founder etc.
                        </p>
                    </div>
                    {/* ---------------- card ---------------- */}

                    <div className="card" >
                        <div className="card-icon"><i class="uil uil-window"></i></div>
                        <h3 className="card-title">Backend API's Designer</h3>
                        <p className="card-text">
                           I make backend API's like Authenticatin API's , Database Releted API's
                           and Payment Getway API's etc.
                        </p>

                    </div>
                    {/* ---------------- card ---------------- */}
                    {/* ---------------- card ---------------- */}
                    <div className="card" >
                        <div className="card-icon"><i class="uil uil-code-branch"></i></div>
                        <h3 className="card-title">ui/ux designer</h3>
                        <p className="card-text">
                            I have good skills of UI/UX designing and I  make Modern Web Pages with 
                            Responsive Designe
                        </p>
                    </div>
                    {/* ---------------- card ---------------- */}


                </div>
            </div>
        </section>
        {/*  end of service section */}


        <section className="gallery" id="projects-component">
            <div className="gallery-header">
                <h1 className="gallery-title">projects</h1>
                <h2 className="gallery-heading">my amazing projects</h2>
            </div>
            <ul className="images" id="lightgallery">
                <li className="card">

                    <img src={process.env.PUBLIC_URL + "/Photos/ProjectsPhotos/img4.jpeg"} alt="image is loading" />

                    <div className="card-animation-layer">
                        <div className="card-content">

                            <a data-fancybox="gallery" href="https://youtu.be/NqWP-pl1CfQ"  >
                                <h2 className="card-title">online resume maker</h2>
                                <p className="card-text">see my online resume maker project build in mern stack</p>
                            </a>



                        </div>
                    </div>

                </li>
                <li className="card">
                    <img src={process.env.PUBLIC_URL + "/Photos/ProjectsPhotos/img8.png"} alt="image is loading" />
                    <div className="card-animation-layer">
                        <div className="card-content">
                            <h2 className="card-title">online drawing website</h2>
                            <p className="card-text">draw paint online this website built in java script</p>
                        </div>
                    </div>
                </li>
                <li className="card">
                    <img src={process.env.PUBLIC_URL + "/Photos/ProjectsPhotos/img2.jpg"} alt="image is loading" />
                    <div className="card-animation-layer">
                        <div className="card-content">

                            <a data-fancybox="gallery" href="https://youtu.be/NqWP-pl1CfQ">
                                <h2 className="card-title">school ecampus</h2>
                                <p className="card-text">see my school ecampus project build in java </p>
                            </a>
                        </div>
                    </div>
                </li>
                <li className="card">
                    <img src={process.env.PUBLIC_URL + "/Photos/ProjectsPhotos/img9.png"} alt="image is loading" />
                    <div className="card-animation-layer">
                        <div className="card-content">
                            <h2 className="card-title">photographer booking website</h2>
                            <p className="card-text">photographer booking website for book cameraman build in java </p>
                        </div>
                    </div>
                </li>
                <li className="card">
                    <img src={process.env.PUBLIC_URL + "/Photos/ProjectsPhotos/img5.png.png"} alt="image is loading" />
                    <div className="card-animation-layer">
                        <div className="card-content">
                            <h2 className="card-title"> ecommarce website</h2>
                            <p className="card-text">logo based clothes ecommerce website in mern stack  </p>
                        </div>
                    </div>
                </li>

                <li className="card">
                    <img src={process.env.PUBLIC_URL + "/Photos/ProjectsPhotos/img1.jpeg"} alt="image is loading" />
                    <div className="card-animation-layer">
                        <div className="card-content">
                            <h2 className="card-title">bloging website</h2>
                            <p className="card-text">bloging website write modern blog in java</p>
                        </div>
                    </div>
                </li>
            </ul>

           
        </section>
        {/* end of project section  */}

        {/* start the bout section ---------------------------------------------- */}

        <section className="about-section" id="about-component">
            <div className="about-header">about </div>
            <div className="about-container">
                <div className="about-wrapper">
                    <div className="image-part">
                        <div className="image">
                            <img src={process.env.PUBLIC_URL + "/Photos/developer.png.png"} alt="" />
                        </div>
                        <div className="social-accounts">
                            <div className="heading">follow me </div>
                            <div className="accounts">
                                <p className="account-logo"><a href="https://github.com/shubhamchoudhary111/web-projects"><i className="uil uil-github"></i></a></p>
                                <p className="account-logo"><a href="https://linkedin.com"><i className="uil uil-linkedin"></i></a></p>
                                <p className="account-logo"><a href="https://instagram.com/choudhary_ji012"><i className="uil uil-instagram"></i></a></p>
                            </div>
                        </div>
                    </div>
                    <div className="about-content">
                        <div className="about-content-header">
                            <div className="about-heading-1">my intro</div>
                            <div className="about-heading-2">about me</div>
                        </div>
                        <div className="about-text">
                        Hi There! I'm a <strong> Shubham Shoudhary</strong>.A <strong>Fullstack Web Developer</strong> having speicialization
                        in backend and front end developemet. I have strong skills of designing web pages
                        and to  build a Rest full Web API's using bcakend languages. I have backend skills in Java backend frameworks Spring core,Spring boot,Hibernate and
                        other backend technologies like as Node.js,Express.js,MongoDbB i have knowledge of MYSQL Database. I also have frontend skills in JavaScript React.js,Angular.js,Bootstrap,Material UI.
                        and I have good knowledge of java <strong> Data Strucutures and Algorithems
                            </strong> and Java Collection Framework.
                        </div>
                        <div className="education-and-experience-details">
                            <div className="tabs-bar">
                                <p className="tab-links tab active-tab " onClick={event => handleTabs(event, "skills")}><i class="uil uil-6-plus"></i>skills</p>
                                <p className="tab-links tab" onClick={event => handleTabs(event, "education")}><i class="uil uil-graduation-cap"></i>education</p>
                                <p className="tab-links tab" onClick={event => handleTabs(event, "experience")}><i class="uil uil-brain"></i>Experience</p>
                            </div>
                            <div className="tab-content skills-content active-tab-content" id="skills">
                                <div className="skills-content-container">
                                    <div className="skills-list">
                                        <ul>
                                            <li><span>UI/UX designer</span> <br />I make designe of the web pages </li>
                                            <li><span>backend developer </span><br />I create backend web API's </li>
                                           
                                        </ul>
                                    </div>
                                    <div className="technical-skills">
                                        <div className="heading">technical skills</div>
                                        <div className="technical-skills-list">
                                            <div className="skill">HTML</div>
                                            <div className="skill">CSS</div>
                                            <div className="skill">Bootstrap</div>
                                            <div className="skill">Java Script</div>
                                            <div className="skill">React.js</div>
                                            <div className="skill">Angular.js</div>
                                            <div className="skill" >Express.js</div>
                                            <div className="skill">MongoDb</div>
                                            <div className="skill">Java</div>
                                            <div className="skill">Collection </div>
                                            <div className="skill">Spring Core</div>
                                            <div className="skill">Spring Boot</div>
                                            <div className="skill">Hibernate</div>
                                            <div className="skill">Mysql</div>
                                            <div className="skill">DSA with Java</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="tab-content education-content"  id="education">
                                <div className="education-content-container">
                                   <div className="education-details">
                                   <div className="detail"> <span>2018 </span><br></br>MPBSE  Class 10th with 84% from Swaraj Bal Niketan High School Badud</div>
                                   <div className="detail"> <span>2020 </span><br></br>MPBSE  Class 12th with 76% from Swaraj Bal Niketan High School Badud</div>
                                   <div className="detail"> <span>2024 </span><br></br>B.tech in computer science from Chameli Devi Group Of Institute Indore</div>
                                   </div>
                                </div>
                               
                            </div>
                            <div className="tab-content experience-content" id="experience">
                              <div className="experience-content-container">
                                    <div className="experience-details">
                                        <div className="detail">
                                            <div className="detail-heading">fresher</div>
                                            <div className="detail-text"> I am fresher but i have good skills of developement so if you see any
                                            skills based developer so you can contact me.</div>
                                        </div>
                                           
                                    </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* end of about section -------------------------------------------------------------- */}

        <section className="contact-section" id="contact-component">
            <div className="contact-container">

                <div className="contact-header">
                    <div className="contact-heading">contact me</div>
                    <h3 className="contact-title">i want to here from you</h3>
                    <p className="contact-text">Please fill out the form on this section to contact
                        with me. Or call between 9:00 a.m. and 8:00 p.m. ET, Monday through Friday</p>
                </div>
                <div className="contact-components">
                    <div className="left-component">
                        <div className="social-links">
                            <div className="social-details">
                                <div className="social-icon address-icon"><i class="uil uil-location-point"></i></div>
                                <div className="details">
                                    <div className="detail-name">Address</div>
                                    <div className="detail">Khandwa road badud</div>
                                </div>
                            </div>
                            {/* end of the social link 1 */}
                            <div className="social-details">
                                <div className="social-icon email-icon"><i class="uil uil-envelope-alt "></i></div>
                                <div className="details">
                                    <div className="detail-name">email</div>
                                    <div className="detail">shubhamchodhary<br></br>8020@gmail.com</div>
                                </div>
                            </div>
                            {/* end of the social link 2 */}
                            {/* end of the social link 1 */}
                            <div className="social-details">
                                <div className="social-icon phone-icon"> <i class="uil uil-phone-alt"></i></div>
                                <div className="details">
                                    <div className="detail-name">Phone</div>
                                    <div className="detail">+91 7447006318</div>
                                </div>
                            </div>
                            {/* end of the social link 3 */}

                        </div>
                    </div>
                    <div className="right-component">

                        <div className="contact-form">

                            <div className="loader-layer" id="loader-layer">
                                <div className="layer"></div>

                                <ClipLoader
                                    color="#15295f"
                                    className="loader"
                                    size={70}
                                />
                                {/* 
                                <ClockLoader
                                     size={50}
                                   color={"#15295f"}
                                    className="loader"
                                /> */}
                            </div>


                            <div className="combo-fields">
                                <div className="form-group">
                                    <input value={data.name} type="text" onChange={formHandler} id="name" placeholder="your name" />
                                    {nameFieldEmpty ? <p className="validation-error">name is required</p> : ""}
                                </div>

                                <div className="form-group">
                                    <input value={data.email} type="email" onChange={formHandler} id="email" placeholder="your email" />
                                    {emailFieldEmpty ? <p className="validation-error">email is required</p> : ""}
                                </div>


                            </div>

                            <div className="combo-fields">
                                <div className="form-group">
                                    <input value={data.mobile} type="mobile" id="mobile" onChange={formHandler} placeholder="mobile number" />
                                    {emailFieldEmpty ? <p className="validation-error">mobile is required</p> : ""}
                                </div>

                                <div className="form-group">
                                    <input value={data.subject} type="text" onChange={formHandler} id="subject" placeholder="subject" />
                                    {messageFieldEmpty ? <p className="validation-error">subject is required</p> : ""}
                                </div>


                            </div>

                            <div className="message-box">
                                <textarea value={data.message} name="" onChange={formHandler} id="message" placeholder="message"></textarea>
                                {messageFieldEmpty ? <p className="validation-error">message is required</p> : ""}
                            </div>

                            <div className="button">
                                <button onClick={sendMail} id="contact-btn">send message</button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </section>




        <div className="go-top-event" id="gotop-icon">
            <i class="uil uil-arrow-up" onClick={goTop}></i>

        </div>

        <FooterComponent />











    </>
}


{/* ---------------- card ---------------- */ }



// <div className="contact-content">

// <h1 className="contact-title">let's connect</h1>
// <p className="contact-text">Please fill out the form on this section to contact
//     with me. Or call between 9:00 a.m. and 8:00 p.m. ET, Monday through Friday</p>
// <div className="social-media">
//     <a href="#"><i className="uil uil-facebook"></i></a>
//     <a href="#"><i class="uil uil-linkedin"></i></a>
//     <a href="#"><i className="uil uil-twitter"></i></a>
// </div>
// </div>
// <div className="contact-form">
// <div className="form">
//     <div className="form-group">
//         <label className="label">your name</label>
//         <input value={data.name} type="text" onChange={formHandler} id="name" />
//         {nameFieldEmpty ? <p className="validation-error">name is required</p> : ""}
//     </div>
//     <div className="form-group">
//         <label className="label">your email</label>
//         <input value={data.email} type="text" onChange={formHandler} id="email" />
//         {emailFieldEmpty ? <p className="validation-error">email is required</p> : ""}
//     </div>
//     <div className="form-group">
//         <label className="label">your subject</label>
//         <input value={data.subject} type="text" onChange={formHandler} id="subject" />
//         {subjectFieldEmpty ? <p className="validation-error">subject is required</p> : ""}
//     </div>
//     <div className=" textarea">
//         <label htmlFor="">message</label>
//         <textarea value={data.message} name="" onChange={formHandler} id="message" ></textarea>
//         {messageFieldEmpty ? <p className="validation-error">message is required</p> : ""}
//     </div>
//     <div className="form-btn">
//         <button onClick={sendMail}> send message</button>
//     </div>
// </div>
// </div>