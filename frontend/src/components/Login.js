import { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState({ email: "" });
  const [password, setPassword] = useState({ password: "" });

  function handleLoginEmail(event) {
    setEmail(event.target.value);
  }

  function handleLoginPassword(event) {
    setPassword(event.target.value);
  }

  return (
    <section className="login">
      <h1 className="login__title">Войти</h1>
      <form
        className="login__form"
        onSubmit={props.handleLogin({ password, email })}
      >
        <input
          className="login__email"
          placeholder="Email"
          onChange={handleLoginEmail}
          value={email.email}
          required
        />
        <input
          className="login__password"
          placeholder="Пароль"
          type="password"
          onChange={handleLoginPassword}
          value={password.password}
          required
        />
        <button className="login__button" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
