import { Link, NavLink } from "react-router-dom";
import HeaderLogo from "../../../shared/icon/assets/HeaderLogo.svg";
import like from "../../../shared/icon/assets/like.svg";
import notification from "../../../shared/icon/assets/notification.svg";
import chevronDown from "../../../shared/icon/assets/chevron-down.svg";
import moon from "../../../shared/icon/assets/moon.svg";
import styles from "./appHeader.module.css";
import { useState } from "react";
import { Input } from "../../../shared/ui/input";
import { useSelector } from "react-redux";
import { routes } from "../../../shared/lib/constants";
import type { RootState } from "../../../services/store";
export function AppHeader() {
  const isAuth = useSelector((store: RootState) => store.auth.IsAuth);
  const auth = useSelector((store: RootState) => store.auth.auth);

  const [value, setValue] = useState("");
  return (
    <header className={styles.header}>
      <img src={HeaderLogo} alt="" />
      <nav className={styles.nav}>
        <NavLink to="/">О проекте</NavLink>
        <div className={styles.wrapNav}>
          <NavLink to="/">Все навыки</NavLink>
          <img src={chevronDown}></img>
        </div>
      </nav>
      <Input onchange={setValue} placeholder="Искать навык" type="search" />
      {!isAuth ? (
        <div className={styles.wrapBtn}>
          <button>
            <img src={moon} alt="" />
          </button>
          <div className={styles.wrapAuth}>
            <Link to={routes.auth} className={styles.authBtn}>
              Войти
            </Link>
            <Link to={routes.register} className={styles.regBtn}>
              Зарегистрироваться
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.wrapRigth}>
          <div className={styles.wrapIcon}>
            <button>
              <img src={moon} alt="" />
            </button>
            <button>
              <img src={notification} alt="" />
            </button>
            <NavLink to="/">
              <img src={like} alt="" />
            </NavLink>
          </div>
          <div>
            <p>{auth?.name}</p>
            <img src={auth?.name} alt="" />
          </div>
        </div>
      )}
    </header>
  );
}
