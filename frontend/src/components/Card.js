import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  const userInfoData = useContext(CurrentUserContext);

  const isOwn = props.card.owner === userInfoData._id;

  const isLiked = props.card.likes.some((i) => i === userInfoData._id);

  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like element__like_active"
  }`;

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element">
      <img
        className="element__image"
        src={props.card.link}
        onClick={handleClick}
        alt={props.card.name}
      />
      <div className="element__group">
        <h2 className="element__title">{props.card.name}</h2>
        <div>
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-calc">{props.card.likes.length}</p>

          {isOwn && (
            <button
              type="button"
              className="element__del"
              onClick={handleDeleteClick}
            />
          )}
        </div>
      </div>
    </article>
  );
}

export default Card;
