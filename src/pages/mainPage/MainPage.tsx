import { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";
import chevronRight from "../../shared/icon/assets/chevron-right.svg";
import styles from "./mainPage.module.css";
import { Filter } from "../../components/ui/filter";

import { useSelector } from "react-redux";
import { type ISkills } from "../../services/store/slice/skillsSlice";
import type { RootState } from "../../services/store";
import { type ICategory } from "../../services/store/slice/userSlice";
export const MainPage = () => {
  const [displayCount, setDisplayCount] = useState(3);

  useEffect(() => {
    let timer: number;
    function handleScroll() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const docVision = window.innerHeight;
        if (scrollTop + docVision >= docHeight - 200) {
          setDisplayCount((prev) => prev + 3);
        }
      }, 300);
    }
    window.addEventListener("scroll", handleScroll);
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
    return skills.map((skill) => {
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
          city: authorCity,
        },
        id: skill.id,
        learnskills: mapSubcategoryNames(author.learnSubcategoryIds, category),
        teachskills: [teachSkills?.name],
        category: mapCategoryNames(author.learnCategoryIds, category),
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
              <Card {...el} isHeartDisplay />
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
              <Card {...el} isHeartDisplay />
            ))}
        </div>
        <div className={styles.headerCards}>
          <h1 className={styles.title}>Рекомендуем</h1>
        </div>
        <div className={styles.mainCards}>
          {GetCardsInfo(skills)
            .slice(0, displayCount)
            .map((el, index) => (
              <Card {...el} isHeartDisplay />
            ))}
        </div>
      </div>
    </div>
  );
};
