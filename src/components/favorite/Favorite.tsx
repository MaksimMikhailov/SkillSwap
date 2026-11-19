import styles from "./favorite.module.css";
import like from "../../shared/icon/assets/like.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Card } from "../ui/card";
import { useSelector } from "react-redux";
import type { RootState } from "../../services/store";
import type { ISkills } from "../../services/store/slice/skillsSlice";
import type { ICategory } from "../../services/store/slice/userSlice";

export function Favorite() {
  const [hasFavorite, setHasFavorite] = useState(
    localStorage.getItem("like") ? true : false,
  );
  const { user, city, category, loading } = useSelector(
    (state: RootState) => state.user,
  );
  const { skills } = useSelector((state: RootState) => state.skills);
  function favoriteCount() {
    const idUser = localStorage.getItem("like");
    if (!idUser) return;
    const parseUserLocarStorage = JSON.parse(idUser) as string[];

    return [...skills].filter((el) => parseUserLocarStorage.includes(el.id));
  }
  console.log();
  const mapCategoryNames = (ids: string[], categories: ICategory[]) =>
    ids
      .map((ids) => categories.find((el) => el.id === ids)?.name)
      .filter((name): name is string => Boolean(name));
  const mapSubcategoryNames = (
    ids: string[] = [],
    categories: ICategory[] = [],
  ) =>
    ids
      .flatMap((id) =>
        categories
          .flatMap((category) => category.subcategories)
          .filter((subcategory) => subcategory.id === id),
      )
      .map((subcategory) => subcategory.name)
      .filter((name): name is string => Boolean(name));

  function GetCardsInfo(skills: ISkills[]) {
    return skills
      .map((skill) => {
        const author = user.find((el) => el.id === skill.authorId);
        if (!author) return;
        const authorCity = city.find((el) => el.id === author.cityId)?.name;

        const teachSkillsCategory = category.find(
          (el) => el.id === skill.categoryId,
        );
        const teachSkills = teachSkillsCategory?.subcategories.find(
          (el) => el.id === skill.subcategoryId,
        );

        return {
          likesCount: skill.likesCount,
          userInfo: {
            name: author.name,
            image: author.avatarUrl,
            age: author.age,
            city: authorCity ?? "",
          },
          id: skill.id,
          learnskills: mapSubcategoryNames(
            author.learnSubcategoryIds,
            category,
          ),
          teachskills: teachSkills ? [teachSkills.name] : [],
          category: mapCategoryNames(author.learnCategoryIds, category),
        };
      })
      .filter((card) => card !== undefined);
  }
  console.log(hasFavorite);
  return (
    <div className={styles.global}>
      {!hasFavorite ? (
        <>
          <h1 className={styles.title}>Избранное</h1>
          <div className={styles.wrapper}>
            <img src={like} alt="" />
            <h2 className={styles.titleH2}>Пока нет избранного</h2>
            <p className={styles.text}>
              Добавляйте понравившиеся навыки в избранное, чтобы быстро к ним
              возвращаться
            </p>
            <NavLink to={"/"} className={styles.link}>
              Вернуться на главную
            </NavLink>
          </div>
        </>
      ) : (
        <div className={styles.mainCards}>
          {GetCardsInfo(favoriteCount()!).map((el) => (
            <Card {...el} isHeartDisplay />
          ))}
        </div>
      )}
    </div>
  );
}
