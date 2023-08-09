import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Card from "./Card";

function Main(props) {
  const userInfoData = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__update" onClick={props.onEditAvatar}>
          <img
            className="profile__avatar"
            src={userInfoData.avatar}
            alt="Аватарка"
          />
          <div className="profile__overley"></div>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{userInfoData.name}</h1>
          <button
            className="profile__adit-button"
            type="button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__subtitle">{userInfoData.about}</p>
        </div>

        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
