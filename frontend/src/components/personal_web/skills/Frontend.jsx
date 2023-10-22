import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const getLevelText = (level) => {
  switch (level) {
    case 1:
      return "Pemula";
    case 2:
      return "Menengah";
    case 3:
      return "Ahli";
    default:
      return "Tidak Diketahui";
  }
};

const Frontend = () => {
  const [skills, setSkills] = useState([]);
  const { url_custom } = useParams();

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

    getSkills();
  }, []);

  return (
    <div className="skills__content">
      {/* <h3 className="skills__title"></h3> */}

      <div className="skills__box">
        <div className="skills__group">
          {skills.map((skill, index) => (
            <div className="skills__data" key={index}>
              <i className="bx bx-badge-check"></i>
              <div>
                <h3 className="skills__name">{skill.nama_skill}</h3>
                <span className="skills__level">{getLevelText(skill.level_keahlian)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Frontend;
