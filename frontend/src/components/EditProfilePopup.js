import PopupWithForm from "./PopupWithForm.js";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function EditProfilePopup(props) {
  const [name, setName] = useState(" ");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  const [description, setDescription] = useState(" ");

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={"Cохранить"}
    >
      <input
        id="namе"
        className="popup__item popup__item_edit-profile_name"
        type="text"
        name="name"
        value={name || ""}
        minLength="2"
        maxLength="40"
        required
        onChange={handleChangeName}
      />
      <span className="namе popup__error"></span>

      <input
        id="job"
        className="popup__item popup__item_edit-profile_job"
        type="text"
        name="job"
        value={description || ""}
        minLength="2"
        maxLength="200"
        required
        onChange={handleChangeDescription}
      />
      <span className="job popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
