import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./homepersonal.css";
import axios from "axios";
import Social from "./Social";
import Data from "./Data";
import ScrollDown from "./ScrollDown";

const Home = () => {
  const [datadiris, setDatadiri] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [showNoDataMessage, setShowNoDataMessage] = useState(true);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    refreshToken();
    getDatadiri();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setDatadiri(decoded.nama); // Assuming "nama" is the name field.
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
      }
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  const getDatadiri = async () => {
    try {
      if (!accessToken) {
        // Handle the case where the token is not found (e.g., the user is not authenticated)
        navigate("/login");
        return;
      }

      // Use the access token to make the API request
      const response = await axios.get("http://localhost:5000/data_diri", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const namaData = response.data.map((item) => item.nama);
      setDatadiri(namaData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Unauthorized, redirect the user to the login page
        navigate("/login");
      } else {
        console.error("Error fetching data:", error);
        setShowNoDataMessage(true);
      }
    }
  };
  

  const imageUrl = datadiris && datadiris.foto;

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

          <div className="home__img"></div>

          <Data />
        </div>
        <ScrollDown />
      </div>
    </section>
  );
};

export default Home;
