import { NavLink } from "react-router-dom";
import { Input } from "../../components/ui/input";
import styles from "./profilePage.module.css";
import React, { useState, type ChangeEvent } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../services/store";
import request from "../../shared/icon/assets/request.svg";
import messageText from "../../shared/icon/assets/message-text.svg";
import likeProfile from "../../shared/icon/assets/likeProfile.svg";
import galleryEdit from "../../shared/icon/assets/gallery-edit.svg";
import idea from "../../shared/icon/assets/idea.svg";
import user from "../../shared/icon/assets/user.svg";
import { Selector } from "../../shared/ui/selector";
import type { IAuth } from "../../services/store/slice/authSlice";
export const ProfilePage = () => {
  const userInfo = useSelector((state: RootState) => state.auth.auth);
  const [userData, setUserData] = useState<IAuth>(userInfo!);
  const { category, city } = useSelector((state: RootState) => state.user);
  const cityOptions = city.map((el) => ({
    value: el.id,
    label: el.name,
  }));

  const [currentStep, setCurrentStep] = useState("Личные данные");
  function changeUserData(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }
  function changeSelectorValue(name: "gender" | "city", value: string) {
    setUserData((prev) => ({ ...prev, [name]: value }));
  }
  const navigationContent = [
    { name: "Заявки", image: request },
    { name: "Мои обмены", image: messageText },
    { name: "Избранное", image: likeProfile },
    { name: "Мои навыки", image: idea },
    { name: "Личные данные", image: user },
  ];
  return (
    <div className={styles.main}>
      <div className={styles.globalProfileList}>
        <ul className={styles.profileList}>
          {navigationContent.map((item, index) => (
            <li
              key={index}
              className={currentStep === item.name ? styles.active : ""}
              onClick={() => setCurrentStep(item.name)}
            >
              <img src={item.image} alt={item.name} />
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.globalElementImageAndInput}>
        <div className={styles.globalInputElement}>
          <div className={styles.emailElement}>
            <Input
              label="Почта"
              placeHolder="Введите почту"
              type="email"
              textError=""
              name="login"
              onChange={changeUserData}
              value={userData.login}
            />
            <button className={styles.changePass}>Изменить пароль</button>
          </div>
          <Input
            label="Имя"
            placeHolder="Введите имя"
            type="text"
            textError=""
            name="name"
            onChange={changeUserData}
            value={userData.name}
          />
          <div className={styles.inputWraps}>
            <div className={styles.inputDate}>
              <label htmlFor="date" className={styles.label}>
                Дата рождения
              </label>
              <input
                type="date"
                placeholder="дд.мм.гггг"
                className={styles.input}
                id="date"
                onChange={changeUserData}
                value={userData.date}
                name="date"
              />
            </div>
            <Selector
              label="Пол"
              options={[
                { value: "Мужской", label: "Мужской" },
                { value: "Женский", label: "Женский" },
              ]}
              placeHolder="Не указано"
              onChange={(value) => changeSelectorValue("gender", value)}
              value={userData.gender}
              textError=""
            />
          </div>
          <Selector
            label="Город"
            options={cityOptions}
            placeHolder="Не указано"
            onChange={(value) => changeSelectorValue("city", value)}
            value={userData.city}
            textError=""
          />
          <div className={styles.sectionUnder}>
            <label htmlFor="date" className={styles.label}>
              О себе
            </label>
            <textarea
              id="decription"
              placeholder="Коротко опишите, чему можете научить"
              className={styles.description}
              onChange={changeUserData}
              value={userData.description}
              maxLength={250}
              name="description"
            ></textarea>
            <button className={styles.saveButton} disabled>
              Сохранить
            </button>
          </div>
        </div>
        <div className={styles.avatar}>
          <img src={userData.image} alt="" className={styles.imgAva} />
          <div className={styles.avatarImage}>
            <img src={galleryEdit} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
