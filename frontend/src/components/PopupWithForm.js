function PopupWithForm(props) {
  return (
    <div
      className={
        props.isOpen
          ? `popup popup_${props.name} popup_opened`
          : `popup popup_${props.name}`
      }
    >
      <div className={`popup__container popup__container_${props.name}`}>
        <h3 className={`popup__title popup__title_${props.name}`}>
          {props.title}
        </h3>
        <form
          className={`popup__form popup__form_${props.name}`}
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}

          <button
            className={`popup__save popup__save_${props.name}`}
            type="submit"
          >
            {props.buttonText}
          </button>
        </form>
        <button
          className={`popup__close popup__close_${props.name}`}
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
