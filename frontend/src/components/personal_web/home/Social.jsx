import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Social = () => {
  const [social, setSocial] = useState({});
  const { url_custom } = useParams();

  useEffect(() => {
    const fetchData = async () => {
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
        }));
        setSocial(socialData[0]); // Ambil objek pertama (atau sesuaikan dengan data Anda)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home__social">
      {social.linkedin && (
        <a
          href={`https://www.linkedin.com/in/${social.linkedin}`}
          className="home__social-icon"
          target="_blank"
          rel="noreferrer"
        >
          <i className="uil uil-linkedin-alt"></i>
        </a>
      )}

      {social.instagram && (
        <a
          href={`https://www.instagram.com/${social.instagram}/`}
          className="home__social-icon"
          target="_blank"
          rel="noreferrer"
        >
          <i className="uil uil-instagram"></i>
        </a>
      )}

      {social.twitter && (
        <a
          href={`https://twitter.com/${social.twitter}`}
          className="home__social-icon"
          target="_blank"
          rel="noreferrer"
        >
          <i className="uil uil-twitter"></i>
        </a>
      )}

      {social.github && (
        <a
          href={`https://github.com/${social.github}`}
          className="home__social-icon"
          target="_blank"
          rel="noreferrer"
        >
          <i className="uil uil-github-alt"></i>
        </a>
      )}
    </div>
  );
};

export default Social;
