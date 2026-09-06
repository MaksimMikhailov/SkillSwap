import { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";
import { UserInfo } from "../../components/ui/userInfo";
import chevronRight from "../../shared/icon/assets/chevron-right.svg";
import styles from "./mainPage.module.css";
import { Filter } from "../../components/ui/filter";
import type { profileData } from "../profilePage/ProfilePage";
import image from "../../shared/icon/assets/Image.png";
import { useDispatch, useSelector } from "react-redux";
import { getSkills } from "../../services/store/slice/skillsSlice";
import type { RootState } from "../../services/store";
import {
  getCategory,
  getUsers,
  getСity,
} from "../../services/store/slice/userSlice";
export const MainPage = () => {
  const array: profileData[] = [
    {
      learnskills: ["Медитация", "Английский язык", "Бизнес-план"],
      teachskills: ["Медитация", "Английский язык", "Бизнес-план"],
      userInfo: { age: 12, image: image, name: "Никита", city: "Питер" },
    },
    {
      learnskills: ["Медитация", "Английский язык", "Бизнес-план"],
      teachskills: ["Медитация", "Английский язык", "Бизнес-план"],
      userInfo: { age: 12, image: image, name: "Никита", city: "Питер" },
    },
    {
      learnskills: ["Медитация", "Английский язык", "Бизнес-план"],
      teachskills: ["Медитация", "Английский язык", "Бизнес-план"],
      userInfo: { age: 12, image: image, name: "Никита", city: "Питер" },
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSkills());
    dispatch(getUsers());
    dispatch(getСity());
    dispatch(getCategory());
  }, []);
  const user = useSelector((state: RootState) => state.user);
  const skills = useSelector((state: RootState) => state.skills);
  const city = useSelector((state: RootState) => state.user);

  function GetCardsInfo() {
    return skills.skills.map((skill) => {
      const author = user.user.find((el) => el.id === skill.authorId);
      const authorCity = city.city.find((el) => el.id === author?.cityId)?.name;
      return {
        userInfo: {
          name: author?.name,
          image: author?.avatarUrl,
          age: author?.age,
          city: authorCity,
        },
        learnskills: ["Медитация", "Английский язык", "Бизнес-план"],
        teachskills: ["Медитация", "Английский язык", "Бизнес-план"],
      };
    });
  }
  return (
    <div className={styles.container}>
      <Filter />
      <div className={styles.containerCard}>
        <div className={styles.headerCards}>
          <h1 className={styles.title}>Популярное</h1>
          <button className={styles.button}>
            Смотреть все <img src={chevronRight} alt="" />
          </button>
        </div>
        <div className={styles.mainCards}>
          {GetCardsInfo()
            .slice(0, 3)
            .map((el, index) => (
              <Card {...el} id={index.toString()} isHeartDisplay />
            ))}
        </div>
        <div className={styles.headerCards}>
          <h1 className={styles.title}>Новое</h1>
          <button className={styles.button}>
            Смотреть все <img src={chevronRight} alt="" />
          </button>
        </div>
        <div className={styles.mainCards}>
          {GetCardsInfo()
            .slice(0, 3)
            .map((el, index) => (
              <Card {...el} id={index.toString()} isHeartDisplay />
            ))}
        </div>
        <div className={styles.headerCards}>
          <h1 className={styles.title}>Рекомендуем</h1>
        </div>
        <div className={styles.mainCards}>
          {GetCardsInfo()
            .slice(0, 3)
            .map((el, index) => (
              <Card {...el} id={index.toString()} isHeartDisplay />
            ))}
        </div>
      </div>
    </div>
  );
};
