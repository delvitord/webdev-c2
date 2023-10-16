import React from "react";
import Header from "./header/Header";
import Home from "./home/HomePersonal";
import About from "./about/About";
import Skills from "./skills/Skills";
import Contact from "./contact/Contact";
import Footer from "./footer/Footer"
import ScrollUp from "./scrollup/ScrollUp";
import Qualification from "./qualification/Qualification";
import Portofolio from "./portofolio/Work";

function PersonalWeb() {
  return (
    <>
      <Header />
      <main className="main">
        <Home />
        <About />
        <Skills />
        <Qualification />
        <Portofolio />
        <Contact />
      </main>
      <Footer />
      <ScrollUp />
    </>
  );
}

export default PersonalWeb;
