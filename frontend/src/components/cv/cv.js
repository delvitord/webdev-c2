import React, { useEffect, useState } from 'react';
import "./cv.css"
import myImage from "../../assets/Delvito.jpg"
import axios from 'axios';  // Import Axios
import { useParams } from 'react-router-dom';

function CV() {
    const [skills, setSkills] = useState([]);
    const [organisasi, setOrganisasi] = useState([]);
    const [pendidikan, setPendidikan] = useState([]);
    const [social, setSocial] = useState({});
    const [projects, setProjects] = useState([]);
    const [datadiris, setDatadiri] = useState([]);
    const { url_custom } = useParams();
    const [imageUrl, setImageUrl] = useState(""); 

  
    useEffect(() => {
      const getSkills = async () => {
        try {
          const url = await axios.get(`http://localhost:5000/custom_url/${url_custom}`);
          const id = url.data[0].dataDiriId;
          const response = await axios.get(`http://localhost:5000/data_diri_full/${id}`);
          setSkills(response.data[0].skill);
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      const getOrganisasi = async () => {
        try {
          const url = await axios.get(`http://localhost:5000/custom_url/${url_custom}`);
          const id = url.data[0].dataDiriId;
          const response = await axios.get(`http://localhost:5000/data_diri_full/${id}`);
          setOrganisasi(response.data[0].organisasi);
        } catch (error) {
          console.error("Error fetching organization data:", error);
        }
      };
  
      const getPendidikan = async () => {
        try {
          const url = await axios.get(`http://localhost:5000/custom_url/${url_custom}`);
          const id = url.data[0].dataDiriId;
          const response = await axios.get(`http://localhost:5000/data_diri_full/${id}`);
          setPendidikan(response.data[0].pendidikan);
        } catch (error) {
          console.error("Error fetching education data:", error);
        }
      };

      const getContact = async () => {
        try {
          const url = await axios.get(`http://localhost:5000/custom_url/${url_custom}`);
          const id = url.data[0].dataDiriId;
          const response = await axios.get(`http://localhost:5000/data_diri_full/${id}`);
          const socialData = response.data.map((social, index) => ({
            id: index + 1,
            linkedin: social.linkedin,
            instagram: social.instagram,
            twitter: social.x,
            github: social.github,
            email:social.email,
            no_telp:social.no_telp,
          }));
          setSocial(socialData[0]); // Ambil objek pertama (atau sesuaikan dengan data Anda)
  
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      const getPortofolio = async () => {
        try {
          const url = await axios.get(`http://localhost:5000/custom_url/${url_custom}`);
          const id = url.data[0].dataDiriId;
          const response = await axios.get(`http://localhost:5000/data_diri_full/${id}`);
          const dataDiri = response.data[0]; // Mengambil data diri pertama dalam array (indeks 0)
          const portofolioData = dataDiri.portofolio;
  
          const projectsData = portofolioData.map((project, index) => ({
            id: index + 1,
            image: project.image, 
            title: project.judul,
            link: project.link,
            file: project.file,
            deskripsi:project.deskripsi,
          }));
  
          setProjects(projectsData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      const getDatadiri = async () => {
        try {
          const url = await axios.get(`http://localhost:5000/custom_url/${url_custom}`);
          const id = url.data[0].dataDiriId;
          const response = await axios.get(`http://localhost:5000/data_diri_full/${id}`);
          setImageUrl(response.data[0].foto);
          const data = response.data.map((item) => ({
            nama: item.nama,
            deskripsi: item.deskripsi,
          }));
    
          setDatadiri(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      getDatadiri();
      getPortofolio();
      getContact();
      getSkills();
      getOrganisasi();
      getPendidikan();
    }, []);
    return (
        <div className="page">
            <header>
              <div className="header-container">
                <img src={myImage} alt="Your Name" className="my-image" />
                <h1>{Array.isArray(datadiris) && datadiris.length > 0
                ? datadiris.map((data) => data.nama).join(", ")
                 : "No Data"}</h1>
                <p>Email: {social.email} | Phone: {social.no_telp} </p>
                <p>LinkedIn: <a href={`https://www.linkedin.com/in/${social.linkedin}`}>https://www.linkedin.com/in/{social.linkedin}</a></p>
                <p>Instagram: <a href={`https://www.instagram.com/${social.instagram}/`}>https://www.instagram.com/{social.instagram}</a></p>
                <p>Github: <a href={`https://github.com/${social.github}`}>https://github.com/{social.github}</a></p>
              </div>
            </header>

            <section className="section">
              <h2>Tentang Saya</h2>
              <p>            
                {datadiris && datadiris.length > 0
                ? datadiris[0].deskripsi || "Description not available."
                : "Description not available."}
                </p>
            </section>

            <section className="section">
                <h2>Skill</h2>
                <ul className="Skill">
                    {skills.map((skill, index) => (
                        <li key={index}>
                            <p>{skill.nama_skill}</p>
                        </li>
                    ))}
                </ul>
            </section>


            <section className="section">
                <h2>Pengalaman Organisasi</h2>
                <ul className="Organisasi">
                {organisasi.map((org, index) => (
                    <li key={index}>
                        <strong>{org.awal_periode} - {org.akhir_periode}</strong><br />
                        <em>{org.nama_organisasi}</em><br />
                        {org.deskripsi}
                    </li>
                ))}
                </ul>
            </section>

            <section className="section">
                <h2>Pendidikan</h2>
                <ul className="Pendidikan">
                {pendidikan.map((edu, index) => (
                        <li key={index}>
                            <strong>{edu.jurusan}, {edu.nama_instansi}</strong><br />
                            <em>{edu.awal_periode} - {edu.akhir_periode}</em><br />
                        </li>
                ))}
                </ul>
            </section>


            <section className="section">
                <h2>Portofolio</h2>
                <ul>
                    {projects.map((project, index) => (
                        <li key={index}>
                            <h3 style={{ fontWeight: 'bold' }}>{project.title}</h3>
                            <p>{project.deskripsi}</p>
                            {/* Anda juga dapat menambahkan tautan atau elemen lain sesuai kebutuhan */}
                        </li>
                    ))}
                </ul>
            </section>
            <a
            download=""
            href={CV}
            className="button button--flex"
            id="button-download"
            onClick={() => window.print()}
          >
            Download CV
            <svg
              class="button__icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15.25 22.7502H9.25C3.82 22.7502 1.5 20.4302 1.5 15.0002V9.00024C1.5 3.57024 3.82 1.25024 9.25 1.25024H14.25C14.66 1.25024 15 1.59024 15 2.00024C15 2.41024 14.66 2.75024 14.25 2.75024H9.25C4.64 2.75024 3 4.39024 3 9.00024V15.0002C3 19.6102 4.64 21.2502 9.25 21.2502H15.25C19.86 21.2502 21.5 19.6102 21.5 15.0002V10.0002C21.5 9.59024 21.84 9.25024 22.25 9.25024C22.66 9.25024 23 9.59024 23 10.0002V15.0002C23 20.4302 20.68 22.7502 15.25 22.7502Z"
                fill="var(--container-color)"
              ></path>
              <path
                d="M22.25 10.7502H18.25C14.83 10.7502 13.5 9.42023 13.5 6.00023V2.00023C13.5 1.70023 13.68 1.42023 13.96 1.31023C14.24 1.19023 14.56 1.26023 14.78 1.47023L22.78 9.47023C22.99 9.68023 23.06 10.0102 22.94 10.2902C22.82 10.5702 22.55 10.7502 22.25 10.7502ZM15 3.81023V6.00023C15 8.58023 15.67 9.25023 18.25 9.25023H20.44L15 3.81023Z"
                fill="var(--container-color)"
              ></path>
              <path
                d="M13.25 13.7502H7.25C6.84 13.7502 6.5 13.4102 6.5 13.0002C6.5 12.5902 6.84 12.2502 7.25 12.2502H13.25C13.66 12.2502 14 12.5902 14 13.0002C14 13.4102 13.66 13.7502 13.25 13.7502Z"
                fill="var(--container-color)"
              ></path>
              <path
                d="M11.25 17.7502H7.25C6.84 17.7502 6.5 17.4102 6.5 17.0002C6.5 16.5902 6.84 16.2502 7.25 16.2502H11.25C11.66 16.2502 12 16.5902 12 17.0002C12 17.4102 11.66 17.7502 11.25 17.7502Z"
                fill="var(--container-color)"
              ></path>
            </svg>
          </a>
        </div>
    );
}

export default CV;