import React from 'react'
import "./footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <h1 className="footer__title">PersonalWeb</h1>

        <ul className="footer__list">
          <li>
            <a href="#about" className="footer__link">
              About
            </a>
          </li>
          <li>
            <a href="#portofolio" className="footer__link">
              Project
            </a>
          </li>
          <li>
            <a href="#qualification" className="footer__link">
              History
            </a>
          </li>
        </ul>

        <div className="footer__social">
          <a
            href="https://www.linkedin.com/in/setiadi-rachmat-0583aa29/"
            className="footer__social-link"
            target="_blank"
            rel="noreferrer"
          >
            <i class="bx bxl-linkedin"></i>
          </a>

          <a
            href="https://www.instagram.com/sheryljesslyn/"
            className="footer__social-link"
            target="_blank"
            rel="noreferrer"
          >
            <i class="bx bxl-instagram"></i>
          </a>

          <a
            href="https://twitter.com/Sheyyszeee"
            className="footer__social-link"
            target="_blank"
            rel="noreferrer"
          >
            <i class="bx bxl-twitter"></i>
          </a>

          <a
            href="https://github.com/"
            className="footer__social-link"
            target="_blank"
            rel="noreferrer"
          >
            <i class="bx bxl-github"></i>
          </a>
        </div>
        <span className="footer__copy">
          &#169; PersonalWeb. All rigths reserved
        </span>
      </div>
    </footer>
  );
}

export default Footer