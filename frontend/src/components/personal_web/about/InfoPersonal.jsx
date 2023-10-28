import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "./about.css";
import CV from "../../../assets/John-Cv.pdf";
import { useParams } from 'react-router-dom';

const Info = () => {
  const [datadiris, setDatadiri] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [totalOfSkill, setTotalOfSkill] = useState(0);
  const [totalOfPortofolio, setTotalOfPortofolio] = useState(0);
  const [totalOfExpert, setTotalOfExpert] = useState(0);
  const [showNoDataMessage, setShowNoDataMessage] = useState(true);
  const navigate = useNavigate();
  const { url_custom } = useParams();

  useEffect(() => {
    getDatadiri();
  }, []);

  
  const getDatadiri = async () => {
    try {
      const url = await axios.get(`http://localhost:5000/custom_url/${url_custom}`);
      const id = url.data[0].dataDiriId;
      const response = await axios.get(`http://localhost:5000/data_diri_full/${id}`);
      const data = response.data.map((item) => ({
        skill: item.skill,
        portofolio: item.portofolio,
      }));
      setTotalOfPortofolio(data[0].portofolio.length);
      setTotalOfSkill(data[0].skill.length);
      const jumlahLevel = data[0].skill.filter((item) => item.level_keahlian === 3).length;
      console.log(jumlahLevel);
      setTotalOfExpert(jumlahLevel);


    } catch (error) {
      console.error("Error fetching data:", error);
      setShowNoDataMessage(true);
    }
  };


  return (
    <div className="about__info grid">
      <div className="about__box">
        <i class="bx bx-award about__icon"></i>
        <h3 className="about__title">A Lot of Skill</h3>
        <span className="about__subtitle">Have {totalOfSkill} Skill</span>
      </div>

      <div className="about__box">

        <i class="bx bx-briefcase-alt about__icon"></i>
        <h3 className="about__title">Completed</h3>
        <span className="about__subtitle">{totalOfPortofolio} Portofolio(s)</span>
      </div>

      <div className="about__box">
        <i class="bx bx-star about__icon"></i>
        <h3 className="about__title">Expert</h3>
        <span className="about__subtitle">in {totalOfExpert} skill(s) </span>
      </div>
    </div>
  );
};

export default Info;
