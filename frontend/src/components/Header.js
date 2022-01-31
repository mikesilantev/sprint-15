import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";
export default function Header({ isLogged, onSignOut, userEmail }) {
  const path = useLocation();
  // const pathMain = path.pathname === '/';
  const pathSignin = path.pathname === "/signin";
  // const [isMenu, setIsMenu] = useState(false);

  // function isOpenMenu() {
  //   setIsMenu(true);
  //   console.log('setIsMenu');
  // }
  // function isCloseMenu() {
  //   setIsMenu(false);
  // }

  return (
    <header className={`header`}>
      <Link to="/">
        <img src={logo} alt="Mesto" className="header__logo" />
      </Link>

      {isLogged ? (
        <div className="header__auth-block">
          <p className="header__email">{userEmail}</p>
          <Link to="/signin" onClick={onSignOut} className="header__link-exit">
            Выйти
          </Link>
        </div>
      ) : (
        <Link
          to={pathSignin ? "/signup" : "/signin"}
          className={`header__link`}
        >
          {pathSignin ? "Регистрация" : "Войти"}
        </Link>
      )}
    </header>
  );
}
