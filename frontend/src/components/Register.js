import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = (props) => {
  const { onRegister } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(email, password);
  };

  return (
    <section className="auth root__auth">
      <h1 className="auth__title">Регистрация</h1>
      <form action="#" className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__input-wrapper">
          <label htmlFor="email" className="auth__label" />
          <input
            type="email"
            className="auth__input"
            id="email"
            placeholder="Email"
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </div>
        <div className="auth__input-wrapper">
          <label htmlFor="password" className="auth__label" />
          <input
            type="password"
            className="auth__input"
            id="password"
            placeholder="Пароль"
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </div>
        <button className="auth__submit">Зарегистрироваться</button>
      </form>
      <Link className="auth__signed-up" to="/sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
};

export default Register;
