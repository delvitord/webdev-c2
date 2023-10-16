import React from "react";
import Header from "./header/Header";
import Home from "./home/HomeLanding";
import About from "./about/About";
import Footer from "./footer/Footer";


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
