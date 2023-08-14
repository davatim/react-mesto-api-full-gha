import PopupWithForm from "./PopupWithForm.js";
import React, { useEffect, useRef } from "react";

function AddPlacePopup(props) {
  const nameCardRef = useRef();
  const linkCardRef = useRef();
  useEffect(() => {
    nameCardRef.current.value = "";
    linkCardRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlaceSubmit({
      name: nameCardRef.current.value,
      link: linkCardRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-card"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={"Создать"}
    >
      <input
        id="place"
        className="popup__item popup__item_edit-card_name"
        type="text"
        name="place"
        defaultValue=""
        placeholder="Название"
        minLength="2"
        maxLength="200"
        required
        ref={nameCardRef}
      />
      <span className="place popup__error"></span>
      <input
        id="url"
        className="popup__item popup__item_edit-card_job"
        type="url"
        name="link"
        defaultValue=""
        placeholder="Ссылка на картинку"
        required
        ref={linkCardRef}
      />
      <span className="url popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
