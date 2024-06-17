import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const [showContactModal, setShowContactModal] = useState(false);
  const modalRef = useRef();

  const toggleContactModal = () => {
    setShowContactModal(!showContactModal);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowContactModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <footer className="App-footer">
      <div className="footer-content">
        <p>&copy; 2024 Note Taking App. All rights reserved.</p>
        <p>Designed by Bang - CSE - HCMUT</p>
        <nav>
          <ul>
            <li>
              <a
                href="https://www.geeksforgeeks.org/user/bangwoo4/"
                aria-label="GeeeksforGeeks"
              >
                GeeeksforGeeks
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/bangwoo4_/"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=100018136776949"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} /> Facebook
              </a>
            </li>
            <li>
              <a href="https://github.com/Bangwoo4" aria-label="Github">
                <FontAwesomeIcon icon={faGithub} /> Github
              </a>
            </li>
            <li>
              <button
                className="contactButton"
                onClick={toggleContactModal}
                aria-label="Contact Us"
              >
                About
              </button>
              {showContactModal && (
                <div className="contact-modal" ref={modalRef}>
                  <h3>Contact</h3>
                  <p>Nguyen Dinh Bang - 2210298</p>
                  <p>nguyendinhbang53az@gmail.com</p>
                  <p>bang.nguyendinh@hcmut.edu.vn</p>
                  <p>0901236608</p>
                  <button
                    onClick={toggleContactModal}
                    aria-label="Close Contact Modal"
                  >
                    Close
                  </button>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
