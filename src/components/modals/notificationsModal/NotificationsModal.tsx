import styles from "./notificationsModal.module.css";
import idea from "../../../shared/icon/assets/idea222.svg";
import type { Notifications } from "../../../shared/lib/types";
import { useState } from "react";

export function NotificationsModal() {
  function getItemLocalStorage() {
    try {
      const notification = JSON.parse(
        localStorage.getItem("notification")!,
      ) as Notifications[];
      return notification;
    } catch (error) {
      return null;
    }
  }
  const [notification, setNotification] = useState(getItemLocalStorage());
  function getNotification(type: boolean) {
    if (!notification) return null;
    const notificationFilters = notification.filter((el) => el.type !== type);
    return notificationFilters;
  }
  const newNotification = getNotification(true);
  console.log(newNotification);
  const readNotification = getNotification(false);
  console.log(readNotification);
  return (
    <>
      <div className={styles.modalGlobal}>
        <div className={styles.wrapNotification}>
          <h3 className={styles.modalTitle}>Новые уведомления</h3>
          <button
            className={styles.modalTitleButton}
            onClick={() => {
              if (!notification) return;
              const readNotification = notification.map((el) => ({
                ...el,
                type: true,
              }));
              setNotification(readNotification);
              localStorage.setItem(
                "notification",
                JSON.stringify(readNotification),
              );
            }}
          >
            Прочитать всё
          </button>
        </div>
        <div className={styles.wrapCardNotif}>
          {newNotification && newNotification.length ? (
            newNotification.map((item) => (
              <>
                <div className={styles.wrapCard}>
                  <div className={styles.modalNotificationWrapText}>
                    <img src={idea} alt="" />
                    <div className={styles.modalWrap}>
                      <p className={styles.modalText}>{item.text}</p>
                      <p className={styles.modalDescription}>
                        Перейдите в профиль. чтобы обсудить детали
                      </p>
                    </div>
                  </div>
                  <p className={styles.modalDate}>
                    {new Date(item.date).toLocaleString("ru-RU", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <button className={styles.modalButtonLink}>Перейти</button>
              </>
            ))
          ) : (
            <div className={styles.modalText}>Уведомлений нет</div>
          )}
        </div>
        <div
          className={`${styles.wrapNotification} ${styles.wrapNotificationMt}`}
        >
          <h4 className={styles.modalTitle}>Просмотренные</h4>
          <p
            className={styles.modalTitleButton}
            onClick={() => {
              setNotification(newNotification);
              localStorage.setItem(
                "notification",
                JSON.stringify(newNotification),
              );
            }}
          >
            Очистить
          </p>
        </div>
        {readNotification && readNotification.length ? (
          readNotification.map((item) => (
            <>
              <div className={styles.wrapCard}>
                <div className={styles.modalNotificationWrapText}>
                  <img src={idea} alt="" />
                  <div className={styles.modalWrap}>
                    <p className={styles.modalText}>{item.text}</p>
                    <p className={styles.modalDescription}>
                      Прими обмен, чтобы обсудить детали
                    </p>
                  </div>
                </div>
                <p className={styles.modalDate}>
                  {new Date(item.date).toLocaleString("ru-RU", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </>
          ))
        ) : (
          <div className={styles.modalText}>Уведомлений нет</div>
        )}
      </div>
    </>
  );
}
