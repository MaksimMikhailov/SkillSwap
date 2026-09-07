import { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";
import { UserInfo } from "../../components/ui/userInfo";
import chevronRight from "../../shared/icon/assets/chevron-right.svg";
import styles from "./mainPage.module.css";
import { Filter } from "../../components/ui/filter";
import type { profileData } from "../profilePage/ProfilePage";
import image from "../../shared/icon/assets/Image.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getSkills,
  type ISkills,
} from "../../services/store/slice/skillsSlice";
import type { AppDispatch, RootState } from "../../services/store";
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
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getSkills());
    dispatch(getUsers());
    dispatch(getСity());
    dispatch(getCategory());
  }, []);
  const { user, city, category, loading } = useSelector(
    (state: RootState) => state.user,
  );
  const { skills } = useSelector((state: RootState) => state.skills);
  function popularCount() {
    return [...skills].sort((a, b) => b.likesCount - a.likesCount);
  }
  function dateCount() {
    return [...skills].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }
  console.log(popularCount());
  function GetCardsInfo(skills: ISkills[]) {
    return skills.map((skill) => {
      const author = user.find((el) => el.id === skill.authorId);
      const authorCity = city.find((el) => el.id === author?.cityId)?.name;

      const authorCategory = author?.learnCategoryIds.map(
        (el) => category.find((category) => category.id === el)!,
      );
      const authorSubCategory = author?.learnSubcategoryIds.map((id, index) => {
        if (!authorCategory) return;
        for (const element of authorCategory) {
          return element?.subcategories.find((el) => el.id === id);
        }
      });

      const teachSkillsCategory = category.find(
        (el) => el.id === skill.categoryId,
      );
      const teachSkills = teachSkillsCategory?.subcategories.find(
        (el) => el.id === skill.subcategoryId,
      );

      return {
        likesCount: skill.likesCount,
        userInfo: {
          name: author?.name,
          image: author?.avatarUrl,
          age: author?.age,
          city: authorCity,
        },
        learnskills: authorCategory?.map((item) => item?.name),
        teachskills: [teachSkills?.name],
      };
    });
  }
  if (loading) return <div>loading</div>;
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
          {GetCardsInfo(popularCount())
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
          {GetCardsInfo(dateCount())
            .slice(0, 3)
            .map((el, index) => (
              <Card {...el} id={index.toString()} isHeartDisplay />
            ))}
        </div>
        <div className={styles.headerCards}>
          <h1 className={styles.title}>Рекомендуем</h1>
        </div>
        <div className={styles.mainCards}>
          {GetCardsInfo(skills)
            .slice(0, 3)
            .map((el, index) => (
              <Card {...el} id={index.toString()} isHeartDisplay />
            ))}
        </div>
      </div>
    </div>
  );
};
