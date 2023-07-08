
const AboutComponent=()=>{
    return<>
    
    <section className="about-section" id="about-component">
            <div className="header"><span>"</span>about me<span>"</span></div>
            <div className="about-container">
                <div className="about-content">
                    <div className="developer-img">
                        <img src={process.env.PUBLIC_URL + "/Photos/developer.png.png"} alt="image not found" />
                    </div>
                    <div className="developer-intro"><span className="sp1">I’m shubham choudhary, I am a fullstck Developer</span>
                        i have 02 <img src={process.env.PUBLIC_URL + "/Photos/exprience.png"} alt="image is loading" />  years exprience of fullstack development <span className="sp1">i designe
                            responsive websites.</span>i have knowledge of <span className="sp1">c c++ and data structures </span><span onClick={showDetailsCard} className="detail-link">see my all details </span>
                    </div>
                    {/* <div className="detail-button"><button>see my all details</button></div> */}
                </div>
                <div className="about-line">
                    <div className="left"></div>
                    <div className="mid">lets chat <img src={process.env.PUBLIC_URL + "/Photos/chatIcon.svg"} alt="loading please wait" /></div>
                    <div className="right"></div>
                </div>
                <div className="socialContent">
                    <div className="socialLinks">
                        <p className="gmail"><i class="uil uil-envelope"></i>shubhamchoudhary8020@gmail.com</p>
                        <div className="icons">
                            <i class="uil uil-telegram"></i>
                            <i class="uil uil-twitter"></i>
                            <i class="uil uil-linkedin"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="detail-card" id="details-card">
                <div className="header">
                    <div className="profile-image"><img src="https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg"
                        alt="image is loading please weait....." />
                    </div>
                    <div className="profile-content">
                        <div className="profile-details">
                            <h4 className="admin-name">Shubham choudhary</h4>

                        </div>
                        <div className="about-admin">
                            <h5 className="heading">about</h5>
                            <p className="about-admin-description">hii my self shubham choudhary and i am fullstack developer and currently i am freelancer and i need a job</p>
                        </div>
                    </div>
                    <div className="admin-education">
                        <h4 className="highest-qualification">highest qualification</h4>
                        <h6 className="qualification">B.tech in computer science</h6>
                    </div>
                    <div class="teaching-experience">
                        <h4 className="experience-heading">experience</h4>
                        <h6 className="experience-year">Fresher</h6>
                    </div>

                    <div className="close-card-btn"><i onClick={closeDetailsCard} className="uil uil-times"></i></div>

                </div>
                {/* end of header */}
                <div class="job-details-section">
                    <div class="job-details">
                        <div class="heading"><i class="uil uil-graduation-cap" ></i>job details</div>
                        <div class="details">
                            <ul>
                                <li>
                                    <p class="detail"><span class="type">employeement type :</span>none</p>
                                </li>
                                <li>
                                    <p class="detail"><span class="type">joining date :</span>none</p>
                                </li>
                                <li>
                                    <p class="detail"><span class="type">email :</span>shubhamchoudhary8020@gmail.com</p>
                                </li>
                                <li>
                                    <p class="detail"><span class="type">mobile :</span>+91 7447006318</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="other-details">
                        <div class="heading"><i class="uil uil-exclamation-circle"></i>other</div>
                        <div class="details">
                            <ul>
                                <li>
                                    <p class="detail"><span class="type">employeement role :</span>none</p>
                                </li>
                                <li>
                                    <p class="detail"><span class="type">stutas:</span>Not working</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="ranking-box">
                        <div class="circular-reprogress" id="progress-circular"></div>
                        <div class="value" >70%</div>
                        <div class="label">ranking in institute</div>
                    </div>
                </div>
            </div>
        </section>

    
    </>
}