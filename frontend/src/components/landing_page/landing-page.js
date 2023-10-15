import React from "react";
import Header from "./header/Header";
import Home from "./home/Home";
import About from "./about/About";
import Skills from "./skills/Skills";
import Services from "./services/Services";
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
        <Services />
        <Qualification />
        <Portofolio />
      </main>
    </>
  );
}

export default landing_page;
