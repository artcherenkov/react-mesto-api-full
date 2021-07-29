import React from "react";

const Footer = () => {
  return (
    <footer className="footer root__footer">
      <p className="footer__copyright">
        © {new Date().getFullYear()} Mesto Russia
      </p>
    </footer>
  );
};

export default Footer;
