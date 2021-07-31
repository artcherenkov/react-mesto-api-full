import React from "react";

import PopupWithForm from "./PopupWithForm";
import { Popup } from "../utils/const";

const SubmitDeletionPopup = (props) => {
  const { isOpen, onClose, onSubmit } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit();
  }

  return (
    <PopupWithForm
      name={Popup.SUBMIT_DELETION}
      title="Вы уверены?"
      buttonTitle="Да"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};

export default SubmitDeletionPopup