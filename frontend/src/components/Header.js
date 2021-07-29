import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = (props) => {
  const { pathname } = useLocation();
  const { loggedIn, email, onSignOut } = props;

  return (
    <header className="header root__header">
      <Link className="header__logo" to="/" />
      {loggedIn ? (
        <React.Fragment>
          <p className="header__email">{email}</p>
          <button className="header__logout" onClick={onSignOut}>
            Выйти
          </button>
        </React.Fragment>
      ) : (
        <Link
          className="header__auth-link"
          to={pathname === "/sign-in" ? "/sign-up" : "/sign-in"}
        >
          {pathname === "/sign-in" ? "Регистрация" : "Войти"}
        </Link>
      )}
    </header>
  );
};

export default Header;
