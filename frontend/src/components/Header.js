import headerLogo from "../images/logo.svg";

import { Link, Route, Routes } from "react-router-dom";

function Headers(props) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <Routes>
        <Route
          path="/"
          element={
            <div className="profile__post">
              {props.userEmail}
              <Link
                to="/sign-in"
                className="header__enter"
                onClick={props.handleUserLeave}
              >
                Выйти
              </Link>
            </div>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__enter">
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__enter">
              Регистрация
            </Link>
          }
        />
      </Routes>
    </header>
  );
}

export default Headers;
