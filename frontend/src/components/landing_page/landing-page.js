import React from "react";
import Header from "./header/Header";
import Home from "./home/Home";
import About from "./about/About";
import Skills from "./skills/Skills";
import Contact from "./contact/Contact";
import Footer from "./footer/Footer"
import ScrollUp from "./scrollup/ScrollUp";
import Qualification from "./qualification/Qualification";
import Portofolio from "./portofolio/Work";

function landing_page() {
  return (
    <>
      <Header />
      <main className="main">
        <Home />
        <About />
        <Skills />
        <Contact />
        <Qualification />
        <Portofolio />
      </main>
      <Footer />
      <ScrollUp />
    </>
  );
}

export default landing_page;
