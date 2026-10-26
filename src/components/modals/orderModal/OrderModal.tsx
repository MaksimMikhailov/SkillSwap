import styles from "./orderModal.module.css";
import done from "../../../shared/icon/assets/Done.svg";
import notification from "../../../shared/icon/assets/notificationModals.svg";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../shared/lib/constants";
interface orderModalProps {
  setisModalOpen: (value: boolean) => void;
  text: string;
  title: string;
  image: string;
  isAuth?: boolean;
}
export function OrderModal({
  setisModalOpen,
  text,
  title,
  image,
  isAuth,
}: orderModalProps) {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.global}>
          <img src={image} alt="" />
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.text}>{text}</p>
          {!isAuth ? (
            <button
              className={styles.button}
              onClick={() => {
                setisModalOpen(false);
              }}
            >
              Готово
            </button>
          ) : (
            <div className={styles.buttonWraps}>
              <button
                className={styles.buttonCancel}
                onClick={() => {
                  setisModalOpen;
                }}
              >
                Отмена
              </button>
              <button
                className={styles.buttonOpen}
                onClick={() => {
                  navigate(routes.auth);
                }}
              >
                Войти
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
