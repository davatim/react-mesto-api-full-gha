function ImagePopup(props) {
  return (
    <div
      className={
        props.card.link
          ? `popup popup_edit-image popup_opened`
          : `popup popup_edit-image`
      }
    >
      <div className="popup__container-images">
        <img
          className="popup__images"
          src={props.card.link}
          alt={props.card.name}
        />
        <p className="popup__images-title">{props.card.name}</p>
        <button
          className="popup__close popup__close_edit-image"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
