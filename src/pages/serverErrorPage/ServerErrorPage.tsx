import styles from "./serverErrorPage.module.css";
import serverNotFound from "../../../src/shared/icon/assets/error 500.png";
import { Link } from "react-router-dom";
import { routes } from "../../shared/lib/constants";
export const ServerErrorPage = () => {
  return (
    <div className={styles.main}>
      <img src={serverNotFound} alt="" />
      <div className={styles.wrapText}>
        <h1 className={styles.title}>На сервере произошла ошибка</h1>
        <p className={styles.text}>
          Попробуйте позже или вернитесь на главную страницу
        </p>
      </div>
      <div className={styles.wrapBtn}>
        <Link to={"#"} className={styles.btnReport}>
          Сообщить об ошибке
        </Link>
        <Link to={routes.main} className={styles.mainBack}>
          На главную
        </Link>
      </div>
    </div>
  );
};
