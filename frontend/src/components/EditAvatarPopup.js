import PopupWithForm from "./PopupWithForm.js";
import { useRef } from "react";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={"Cохранить"}
    >
      <input
        id="avatar"
        className={`popup__item popup__item_edit-avatar_name`}
        type="url"
        name="avatar"
        defaultValue=""
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      />
      <span className="avatar popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
