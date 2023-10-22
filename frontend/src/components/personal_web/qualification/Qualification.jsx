import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Qualification.css";
import { useParams } from 'react-router-dom';

const Qualification = () => {
  const [toggleState, setToggleState] = useState(1);
  const [organisasi, setOrganisasi] = useState([]);
  const [pendidikan, setPendidikan] = useState([]);
  const { url_custom } = useParams();

  useEffect(() => {
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

    getOrganisasi();
    getPendidikan();
  }, []);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <section className="qualification section" id="qualification">
      <h2 className="section__title mt-6">History</h2>
      <span className="section__subtitle">My Personal Journey</span>

      <div className="qualification__container container">
        <div className="qualification__tabs">
          <div
            className={`qualification__button ${toggleState === 1 ? "qualification__active" : ""} button--flex`}
            onClick={() => toggleTab(1)}
          >
            <i className="uil uil-briefcase-alt qualification__icon"></i>{" "}
            Organization
          </div>

          <div
            className={`qualification__button ${toggleState === 2 ? "qualification__active" : ""} button--flex`}
            onClick={() => toggleTab(2)}
          >
            <i className="uil uil-graduation-cap qualification__icon"></i>{" "}
            Education
          </div>
        </div>

        <div className="qualification__section">
          <div
            className={
              toggleState === 1
                ? "qualification__content qualification__content-active"
                : "qualification__content"
            }
          >
            {organisasi.map((org, index) => (
              <div className="qualification__data" key={index}>
                <div>
                  <h3 className="qualification__title">{org.nama_organisasi}</h3>
                  <span className="qualification__subtitle">{org.jabatan}</span>
                  <div className="qualification__calendar">
                    <i className="uil uil-calendar-alt"></i>{' '}
                    {org.awal_periode} - {org.akhir_periode}
                  </div>
                </div>

                <div>
                  <span className="qualification__rounder"></span>
                  <span className="qualification__line"></span>
                </div>
              </div>
            ))}
          </div>

          <div
            className={
              toggleState === 2
                ? "qualification__content qualification__content-active"
                : "qualification__content"
            }
          >
            {pendidikan.map((edu, index) => (
              <div className="qualification__data" key={index}>
                <div>
                  <h3 className="qualification__title">{edu.nama_instansi}</h3>
                  <span className="qualification__subtitle">{edu.jurusan}</span>
                  <div className="qualification__calendar">
                    <i className="uil uil-calendar-alt"></i>{' '}
                    {edu.awal_periode} - {edu.akhir_periode}
                  </div>
                </div>

                <div>
                  <span className="qualification__rounder"></span>
                  <span className="qualification__line"></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
