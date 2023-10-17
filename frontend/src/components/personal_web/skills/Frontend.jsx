import React, { useState, useEffect } from "react";
import axios from "axios";

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

  useEffect(() => {
    const getSkills = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:5000/datadiri/skill", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setSkills(response.data);
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
