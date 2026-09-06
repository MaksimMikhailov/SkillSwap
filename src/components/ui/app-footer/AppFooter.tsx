import { Link } from "react-router-dom";
import { HeaderLogo } from "../../../shared/icon";
import styles from "./appFooter.module.css";
import { routes } from "../../../shared/lib/constants";
export function AppFooter() {
  return (
    <footer className={styles.footer}>
      <img src={HeaderLogo} alt="" />
      <div className={styles.wrapFooter}>
        <ul className={styles.listDecoration}>
          <li>
            <Link to={routes.main}> О проекте</Link>
          </li>
          <li>
            <Link to={routes.skill}>Все навыки</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to={routes.main}>Контакты</Link>
          </li>
          <li>
            <Link to={routes.main}>Блог</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to={routes.main}></Link> Политика конфиденциальности
          </li>
          <li>
            <Link to={routes.main}></Link> Пользовательское соглашение
          </li>
        </ul>
      </div>
      <p className={styles.name}>SkillSwap — 2025</p>
    </footer>
  );
}
