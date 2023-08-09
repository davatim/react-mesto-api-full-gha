import { useState } from "react";
import { NavLink } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState({ email: "" });
  const [password, setPassword] = useState({ password: "" });

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  return (
    <section className="register">
      <h1 className="register__title">Регистрация</h1>
      <form
        className="register__form"
        onSubmit={props.handleRegister({ password, email })}
      >
        <input
          className="register__email"
          placeholder="Email"
          onChange={handleEmail}
          value={email.email}
          required
        />
        <input
          className="register__password"
          placeholder="Пароль"
          type="password"
          onChange={handlePassword}
          value={password.password}
          required
        />
        <button className="register__button" type="submit">
          Зарегистрироваться
        </button>
        <div className="register__question">
          Уже зарегистрированы?{" "}
          <NavLink to="/sign-in" className="register__enter">
            Войти
          </NavLink>
        </div>
      </form>
    </section>
  );
}

export default Register;
