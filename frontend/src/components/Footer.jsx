import React from "react";
import logo from "/public/assets/LOGO-dark-mode.webp";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center md:flex-row justify-between">
        {/* Logo */}
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/">
            <img src={logo} alt="MR TECHNOLOGIES Logo" className="w-8 h-auto" />
          </Link>
        </div>

        {/* Copyright and Links */}
        <div className="text-center md:text-center">
          <p className="text-sm text-white mb-2">
            &copy; {new Date().getFullYear()} MR TECHNOLOGIES.
          </p>
          <p className="text-sm text-white">
            All rights reserved.
            <br />
            <a
              href="https://www.mr-technologies.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:underline"
            >
              mr-technologies.ma
            </a>
            &nbsp;&bull;&nbsp;
            <a
              href="https://www.gotodev.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:underline"
            >
              gotodev.ma
            </a>
          </p>
        </div>
        {/* Social Media Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="https://facebook.com/m.elmachhoune"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-yellow-500 transition"
            aria-label="Facebook"
          >
            <FaFacebook size={24} />
          </a>

          <a
            href="https://instagram.com/mr.technologies"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-yellow-500 transition"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
