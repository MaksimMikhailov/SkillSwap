import { NavLink } from "react-router-dom";
import HeaderLogo from "../../../shared/icon/assets/HeaderLogo.svg";
import like from "../../../shared/icon/assets/like.svg";
import notification from "../../../shared/icon/assets/notification.svg";
import chevronDown from "../../../shared/icon/assets/chevron-down.svg";
import moon from "../../../shared/icon/assets/moon.svg";
import styles from "./appHeader.module.css";
import { useState } from "react";
import { Input } from "../../../shared/ui/input";
export function AppHeader() {
  const [isAuth, setisAuth] = useState(false);
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

      {isAuth ? (
        <div className={styles.wrapBtn}>
          <button>
            <img src={moon} alt="" />
          </button>
          <div className={styles.wrapAuth}>
            <button className={styles.authBtn} onClick={() => setisAuth(true)}>
              Войти
            </button>
            <button className={styles.regBtn} onClick={() => setisAuth(true)}>
              Зарегистрироваться
            </button>
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
            <p>Максим</p>
            <img src="image" alt="" />
          </div>
        </div>
      )}
    </header>
  );
}
