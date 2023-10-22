import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./homepersonal.css";
import axios from "axios";
import Social from "./Social";
import Data from "./Data";
import ScrollDown from "./ScrollDown";
import { useParams } from 'react-router-dom';

const Home = () => {
  const [datadiris, setDatadiri] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [showNoDataMessage, setShowNoDataMessage] = useState(true);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [imageUrl, setImageUrl] = useState(""); 
  const { url_custom } = useParams();

  useEffect(() => {
    getDatadiri();
  }, []);


  const getDatadiri = async () => {
    try {
      const url = await axios.get(`http://localhost:5000/custom_url/${url_custom}`);
      const id = url.data[0].dataDiriId;
      const response = await axios.get(`http://localhost:5000/data_diri_full/${id}`);
      setImageUrl(response.data[0].foto);
      const namaData = response.data.map((item) => item.nama);
      setDatadiri(namaData);
    } catch (error) {
     
        console.error("Error fetching data:", error);
        setShowNoDataMessage(true);
  
    }
  };
  


  const divStyle = {
    backgroundImage: imageUrl ? `url(${imageUrl})` : "url_default_image.jpg",
  };

  // If there's an `imageUrl`, fetch it with the Authorization header
  if (imageUrl) {
    fetch(imageUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          divStyle.backgroundImage = `url(${imageUrl})`;
        } else {
          console.error(
            "Failed to fetch image. Status code: " + response.status
          );
          return response.text();
        }
      })
      .then((errorText) => {
        console.error("Error response from server:", errorText);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }


  return (
    <section className="home section" id="home">
      <div className="home__container container grid">
        <div className="home__content grid">
          <Social />

          <div className="home__img" style={{ backgroundImage: `url(${imageUrl})` }}></div>

          <Data />
        </div>
        <ScrollDown />
      </div>
    </section>
  );
};

export default Home;
