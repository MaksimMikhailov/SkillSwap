import { useState } from "react";
import styles from "./personalData.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../services/store";
import type { IAuth } from "../../services/store/slice/authSlice";
import { Input } from "../ui/input";
import { Selector } from "../../shared/ui/selector";
import galleryEdit from "../../shared/icon/assets/gallery-edit.svg";
export function PersonalData() {
  const userInfo = useSelector((state: RootState) => state.auth.auth);
  const [userData, setUserData] = useState<IAuth>(userInfo!);
  const { category, city } = useSelector((state: RootState) => state.user);
  const cityOptions = city.map((el) => ({
    value: el.id,
    label: el.name,
  }));

  function changeUserData(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }
  function changeSelectorValue(name: "gender" | "city", value: string) {
    setUserData((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <>
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
    </>
  );
}
