import React from 'react';
import "./CV.css"
import myImage from "../../assets/Delvito.jpg"
function CV() {
    return (
        <div className="page">
            <header>
              <div className="header-container">
                <img src={myImage} alt="Your Name" className="my-image" />
                <h1>NOUVELLI CORNELIA</h1>
                <p>Email: NOUVELLI.19051@student.its.ac.id | Phone: (123) 456-7890 </p>
                <p>LinkedIn: <a href="https://www.linkedin.com/in/nouvelli-cornelia-6aab4216b">https://www.linkedin.com/in/nouvelli-cornelia-6aab4216b</a></p>
                <p>Instagram: <a href="https://www.instagram.com/nouvelli">https://www.instagram.com/nouvelli</a></p>
                <p>Github: <a href="https://github.com/nouvelli">https://github.com/nouvelli</a></p>
              </div>
            </header>

            <section className="section">
              <h2>Tentang Saya</h2>
              <p>Lorem ipsum</p>
            </section>

            <section className="section">
                <h2>Skill</h2>
                <ul className="Skill">
                    <li>
                      <p>Java</p>
                    </li>
                    <li>
                      <p>Java</p>
                    </li>
                    <li>
                      <p>Java</p>
                    </li>
                    <li>
                      <p>Java</p>
                    </li>
                    <li>
                      <p>Java</p>
                    </li>
                    <li>
                      <p>Java</p>
                    </li>
                </ul>
            </section>

            <section className="section">
                <h2>Pengalaman Organisasi</h2>
                <ul>
                    <li>
                        <strong>July 2023 - January 2024</strong><br />
                        <em>IT Application Intern, PT BANK MANDIRI</em><br />
                        Assisted technical analyst in payment integration & platform tasks.
                    </li>
                </ul>
            </section>

            <section className="section">
                <h2>Pendidikan</h2>
                <ul>
                    <li>
                        <strong>2019 - Present</strong><br />
                        <em>INFORMATICS ENGINEERING, INSTITUT TEKNOLOGI SEPULUH NOPEMBER</em><br />
                        Current GPA until seventh term: 3.10/4.00
                    </li>
                    {/* Other education items go here */}
                </ul>
            </section>

            <section className="section">
                <h2>Portofolio</h2>
                <p>
                    I enjoy hand-lettering and graphic design, particularly for photos and videos. You can view my work on my Instagram account <a href="https://www.instagram.com/nouvellic">nouvellic</a>.
                </p>
            </section>
        </div>
    );
}

export default CV;
