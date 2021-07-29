import React from "react";
import iconSuccess from "../images/icon-success.svg";
import iconError from "../images/icon-error.svg";
import { Tooltip } from "../utils/const";

const InfoTooltip = (props) => {
  const { tooltip, onClose } = props;
  const { isOpen, tooltip: tooltipType } = tooltip;
  const isError = tooltipType === Tooltip.ERROR;

  return (
    <div className={`popup main__popup ${isOpen && "popup_opened"}`}>
      <div className="popup__auth-container">
        <button
          className="popup__close-button button"
          type="button"
          aria-label="Закрыть редактирование профиля"
          onClick={onClose}
        />
        <img
          className="popup__tooltip-icon"
          src={isError ? iconError : iconSuccess}
          alt={isError ? "Ошибка" : "Успешно"}
        />
        <h2 className="popup__message">
          {isError
            ? "Что-то пошло не так! Попробуйте ещё раз."
            : "Вы успешно зарегистрировались!"}
        </h2>
      </div>
    </div>
  );
};

export default InfoTooltip;
