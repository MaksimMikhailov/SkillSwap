import { Link, NavLink } from "react-router-dom";
import HeaderLogo from "../../../shared/icon/assets/HeaderLogo.svg";
import Logout from "../../../shared/icon/assets/logout.svg";
import like from "../../../shared/icon/assets/like.svg";
import notification from "../../../shared/icon/assets/notification.svg";
import chevronDown from "../../../shared/icon/assets/chevron-down.svg";
import moon from "../../../shared/icon/assets/moon.svg";
import styles from "./appHeader.module.css";
import { useState } from "react";
import { Input } from "../../../shared/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../../../shared/lib/constants";
import type { RootState } from "../../../services/store";
import { actionLogout } from "../../../services/store/slice/authSlice";
import { NotificationsModal } from "../../modals/notificationsModal";
import { SkillsModal } from "../../modals/skillsModal";
export function AppHeader() {
  const isAuth = useSelector((store: RootState) => store.auth.IsAuth);
  const auth = useSelector((store: RootState) => store.auth.auth);
  const [modalProf, setModalProf] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [modalNotification, setModalNotification] = useState(false);
  const dispatch = useDispatch();
  console.log(isAuth);
  const [value, setValue] = useState("");
  return (
    <header className={styles.header}>
      <Link to={routes.main}>
        <img src={HeaderLogo} alt="" />
      </Link>

      <nav className={styles.nav}>
        <Link to="/">О проекте</Link>
        <div
          className={`${styles.wrapNav} ${buttonStatus ? styles.active : ""}`}
          onClick={() => {
            setButtonStatus(!buttonStatus);
          }}
        >
          <button>Все навыки</button>
          <img src={chevronDown} alt="" />
        </div>
      </nav>
      <Input
        onChange={(event) => setValue(event.target.value)}
        value={value}
        placeholder="Искать навык"
        type="search"
      />
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
        <>
          <div className={styles.wrapRigth}>
            <div className={styles.wrapIcon}>
              <button>
                <img src={moon} alt="" />
              </button>
              <button onClick={() => setModalNotification(!modalNotification)}>
                <img src={notification} alt="" />
              </button>
              <Link to={`${routes.profile}?tab=favorite`}>
                <img src={like} alt="" />
              </Link>
            </div>
            <div
              className={styles.wrapAvatar}
              onClick={() => setModalProf(!modalProf)}
            >
              <p>{auth?.name}</p>
              <img src={auth?.image} alt="" />
            </div>
          </div>
          {modalProf && (
            <div className={styles.modal}>
              <Link
                to={routes.profile}
                className={styles.profile}
                onClick={() => {
                  setModalProf(false);
                }}
              >
                Личный кабинет
              </Link>
              <button
                className={styles.logout}
                onClick={() => {
                  setModalProf(false);
                  dispatch(actionLogout());
                }}
              >
                Выйти из аккаунта <img src={Logout} alt="" />
              </button>
            </div>
          )}
          {modalNotification && <NotificationsModal />}
          {buttonStatus && <SkillsModal />}
        </>
      )}
    </header>
  );
}
