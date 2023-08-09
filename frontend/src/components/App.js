import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import { register, login, loginWithToken } from "../utils/apiAuth.js";
import { ProtectedRoute } from "./ProtectedRoute.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import { useState, useEffect } from "react";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [openToolTip, setOpenToolTip] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  function handleUserLeave() {
    localStorage.removeItem("jwt");
    setUserEmail("");
  }

  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      loginWithToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setUserEmail(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          //eslint-disable-naxt-line
          console.log(err);
        });
    }
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);
  // });

  const handleRegister =
    ({ password, email }) =>
    (event) => {
      event.preventDefault();
      register(password, email)
        .then((res) => {
          if (res !== false) {
            navigate("/sign-in", { replace: true });
            setStatus(true);
            setMessage("Вы успешно зарегистрировались!");
          }
        })
        .catch((err) => {
          console.log(err);
          setStatus(false);
          setMessage("Неудачно");
        })
        .finally(() => {
          setOpenToolTip(true);
        });
    };

  const handleLogin =
    ({ password, email }) =>
    (event) => {
      event.preventDefault();
      login(password, email)
        .then((res) => {
          if (res !== false) {
            setUserEmail(email);
            navigate("/", { replace: true });
            setIsLoggedIn(true);
            localStorage.setItem("jwt", res.token);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoggedIn(false);
          setOpenToolTip(true);
        });
    };

  const [currentUser, setСurrentUser] = useState({});

  useEffect(() => {
    api
      .getUserInfo()
      .then((userInfoApi) => {
        setСurrentUser(userInfoApi);
      })
      .catch((err) => console.log(err));
  }, []);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setOpenToolTip(false);
  }

  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialCards()
        .then((cardsApi) => {
          setCards(cardsApi);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
        // function handleCardLike(card) {
        //   const isLiked = card.likes.some((i) => i._id === currentUser._id);
        //?????????????????
        // const filteredCards =  cards.filter((item) => item._id !== card._id);
        // setCards(filteredCards)
        //???????????????????
      // })
        setCards((state) => state.filter((item) => item._id !== card._id));
      })

      .catch((err) => console.log(err));
  }

  function handleUpdateUser(userInfo) {
    api
      .setUserInfo(userInfo)
      .then((userInfoApi) => {
        setСurrentUser(userInfoApi);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(userAvatar) {
    api
      .updateAvatar(userAvatar)
      .then((userAvatarApi) => {
        setСurrentUser(userAvatarApi);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);

        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          status={status}
          userEmail={userEmail}
          handleUserLeave={handleUserLeave}
        />
        <Routes>
          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            path="/sign-up"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                isLoggedIn={isLoggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route
            path="/*"
            element={
              <ProtectedRoute
                element={Main}
                isLoggedIn={isLoggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                onCardDelete={handleCardDelete}
              />
            }
          />
        </Routes>
        <InfoTooltip
          status={status}
          message={message}
          isOpen={openToolTip}
          onClose={closeAllPopups}
        />
        <Footer />
      </div>

      <PopupWithForm name="confirm" title="Вы уверены?" />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlaceSubmit={handleAddPlaceSubmit}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
