import React from "react";
import Header from "./header/Header";
import Home from "./home/Home";
import About from "./about/About";
import Skills from "./skills/Skills";
import Services from "./services/Services";

function landing_page() {
  return (
    <>
      <Header />
      <main className="main">
        <Home />
        <About />
        <Skills />
        <Services />
      </main>
    </>
  );
}

export default landing_page;
