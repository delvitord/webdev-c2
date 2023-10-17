import React from "react";
import Header from "./header/HeaderLanding";
import Home from "./home/HomeLanding";
import About from "./about/AboutLanding";
import Footer from "./footer/FooterLanding";


function PersonalWeb() {
  return (
    <>
      <Header />
      <main className="main">
        <Home />
        <About />
      </main>
      <Footer />
    </>
  );
}

export default PersonalWeb;
