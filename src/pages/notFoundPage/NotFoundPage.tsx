import styles from "./notFoundPage.module.css";
import notFound from "../../../src/shared/icon/assets/error 404.png";
import { Link } from "react-router-dom";
import { routes } from "../../shared/lib/constants";
export const NotFoundPage = () => {
  return (
    <div className={styles.main}>
      <img src={notFound} alt="" />
      <div className={styles.wrapText}>
        <h1 className={styles.title}>Страница не найдена</h1>
        <p className={styles.text}>
          К сожалению, эта страница недоступна. Вернитесь на главную страницу
          или попробуйте позже
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
