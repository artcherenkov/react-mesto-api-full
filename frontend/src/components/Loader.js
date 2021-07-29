import React from "react";
import spinnerImg from "../images/icon-spinner.svg";

const Loader = () => {
  return (
    <div className="spinner">
      <img className="spinner__image" src={spinnerImg} alt="Спиннер загрузки" />
    </div>
  );
};

export default Loader;
