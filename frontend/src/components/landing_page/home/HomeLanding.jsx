import React from "react";
import "./homelanding.css";
import Social from "./SocialLanding";
import Data from "./DataLanding";
import ScrollDown from "./ScrollDownLanding";

const Home = () => {
  return (
    <section className="home section" id="home">
      <div className="home__container container grid">
        <div className="home__content grid">
          <Social />

          <div className="home__img_1"></div>

          <Data />
        </div>
        <ScrollDown />
      </div>
    </section>
  );
};

export default Home;
