import { useSelector } from "react-redux";
import { UserInfo } from "../ui/userInfo";
import styles from "./request.module.css";
import type { RootState } from "../../services/store";
import { useState } from "react";
import type { Notifications } from "../../shared/lib/types";
import { NavLink } from "react-router-dom";
import notification from "../../shared/icon/assets/notification.svg";
export function Request() {
  const userinfo = useSelector((state: RootState) => state.auth.auth)!;
  const city = useSelector((state: RootState) => state.user.city)!;
  const [status, setStatus] = useState("pending");
  function getUserAge(date: string) {
    const today = new Date();
    const birth = new Date(date);
    const dateNew = today.getFullYear() - birth.getFullYear();
    return dateNew;
  }
  console.log(city);
  function getCityId(cityArray: string) {
    const cityCurrent = city.find((el) => el.id === cityArray);
    if (!cityCurrent) return "Город не найден";
    return cityCurrent.name;
  }
  function localStorageItem() {
    try {
      const localStorageItem = JSON.parse(
        localStorage.getItem("notification")!,
      ) as Notifications[];
      return localStorageItem;
    } catch (error) {
      return null;
    }
  }

  return (
    <>
      <div className={styles.global}>
        {localStorageItem() ? (
          <div className={styles.card}>
            <UserInfo
              name={userinfo.name}
              age={getUserAge(userinfo.date)}
              city={getCityId(userinfo.city)}
              image={userinfo.image}
            />
            <p className={styles.support}>Предлагает обмен</p>
            <button className={styles.nother}>Подробнее</button>
            <div className={styles.wraps}>
              {status === "pending" ? (
                <>
                  <button
                    className={styles.success}
                    onClick={() => setStatus("fulfilled")}
                  >
                    Принять обмен
                  </button>
                  <button
                    className={styles.failed}
                    onClick={() => setStatus("reject")}
                  >
                    Отклонить обмен
                  </button>
                </>
              ) : status === "reject" ? (
                <div className={styles.failedStatus}>Заявка отклонена</div>
              ) : (
                <div className={styles.successStatus}>Заявка принята</div>
              )}
            </div>
          </div>
        ) : (
          <>
            <h1 className={styles.title}>Заявки</h1>
            <div className={styles.wrapper}>
              <img src={notification} alt="" />
              <h2 className={styles.titleH2}>Новых заявок пока нет</h2>
              <p className={styles.text}>
                Продолжайте делиться своими навыками, чтобы пользователи
                присылали вам предложения на обмен
              </p>
              <NavLink to={"/"} className={styles.link}>
                Вернуться на главную
              </NavLink>
            </div>
          </>
        )}
      </div>
    </>
  );
}
