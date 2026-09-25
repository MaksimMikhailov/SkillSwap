import styles from "./skillPage.module.css";
import image from "../../shared/icon/assets/Image.png";
import share from "../../shared/icon/assets/share.svg";
import moreSquare from "../../shared/icon/assets/more-square.svg";
import arrow from "../../shared/icon/assets/chevron-right.svg";
import { Card } from "../../components/ui/card";
import { Like } from "../../components/ui/like";
import { useState } from "react";
import type { IUserInfo } from "../../components/ui/card/Card";
import type { Skills } from "../../shared/lib/types";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "../../services/store";
import type { ISkills } from "../../services/store/slice/skillsSlice";
import type { ICategory } from "../../services/store/slice/userSlice";
export interface profileData {
  userInfo: IUserInfo;
  teachskills: Skills[];
  learnskills: Skills[];
}
export const SkillPage = () => {
  const { id } = useParams();
  const { skills, loading } = useSelector((state: RootState) => state.skills);
  const { user, city, category } = useSelector(
    (state: RootState) => state.user,
  );
  const skillData = getSkillData();
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [images, setImages] = useState(skillData?.skillsUser.images!);

  if (loading) return <>loading</>;
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

  function getSkillData() {
    const skillsUser = skills.find((el) => el.id === id);
    if (!skillsUser) return;
    const categorySkills = category.find(
      (el) => el.id === skillsUser.categoryId,
    );
    if (!categorySkills) return;
    const subCategorySkills = categorySkills.subcategories.find(
      (el) => el.id === skillsUser.subcategoryId,
    );
    if (!subCategorySkills) return;
    const author = user.find((el) => el.id === skillsUser.authorId);
    if (!author) return;
    const citySkills = city.find((el) => el.id === author.cityId);
    if (!citySkills) return;
    return {
      skillsUser,
      categorySkills,
      subCategorySkills,
      author,
      citySkills,
    };
  }

  function categoryCrumb() {
    if (!skillData?.categorySkills.name || !skillData?.subCategorySkills.name) {
      return "";
    }
    return `${skillData.categorySkills.name} / ${skillData.subCategorySkills.name}`;
  }

  function getCardInfo() {
    if (!skillData) return;
    const teachSkillsCategory = category.find(
      (el) => el.id === skillData.skillsUser.categoryId,
    );
    const teachSkills = teachSkillsCategory?.subcategories.find(
      (el) => el.id === skillData.skillsUser.subcategoryId,
    );
    return {
      userInfo: {
        name: skillData.author.name,
        image: skillData.author.avatarUrl,
        age: skillData.author.age,
        city: skillData.citySkills.name,
      },
      learnskills: mapSubcategoryNames(
        skillData.author.learnSubcategoryIds,
        category,
      ),
      teachskills: teachSkills ? [teachSkills.name] : [],
      category: mapCategoryNames(skillData.author.learnCategoryIds, category),
    };
  }

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
          city: authorCity as string,
        },
        id: skill.id,
        learnskills: mapSubcategoryNames(author.learnSubcategoryIds, category),
        teachskills: [teachSkills?.name],
        category: mapCategoryNames(author.learnCategoryIds, category),
      };
    });
  }
  function sortSkillsCategory() {
    const skillsUser = skills.find((el) => el.id === id);
    if (!skillsUser) return [];

    return skills.filter(
      (el) =>
        el.categoryId === skillsUser.categoryId &&
        el.authorId !== skillsUser.authorId,
    );
  }
  const similarSkills = GetCardsInfo(sortSkillsCategory());
  const cardInfo = getCardInfo();
  if (!cardInfo?.userInfo) return <div>Загрузка</div>;

  return (
    <>
      <div className={styles.profile}>
        <Card
          userInfo={cardInfo.userInfo}
          learnskills={cardInfo.learnskills}
          teachskills={cardInfo.teachskills}
          description={skillData?.author.about}
          hasProfile={false}
        />
        <div className={styles.wrapProfile}>
          <div className={styles.icons}>
            <Like
              onClick={() => {
                setIsActive(!isActive);
                if (count === undefined || !setCount) return;
                isActive ? setCount(count - 1) : setCount(count + 1);
              }}
              active={!isActive}
              likesCount={count}
            />
            <img src={share} alt="" style={{ cursor: "pointer" }} />
            <img src={moreSquare} alt="" style={{ cursor: "pointer" }} />
          </div>
          <div className={styles.wrapDescription}>
            <div className={styles.description}>
              <h1 className={styles.title}>{skillData?.skillsUser.title}</h1>
              <p className={styles.link}>{categoryCrumb()}</p>
              <p className={styles.text}>{skillData?.skillsUser.description}</p>
              <button className={styles.button}>Предложить обмен</button>
            </div>
            <div className={styles.wrapper}>
              <button
                className={`${styles.arrowLeft} ${styles.arrowSecondary}`}
                onClick={() => {
                  const array = [...images];
                  array.unshift(array.pop()!);
                  setImages(array);
                }}
              >
                <img src={arrow} alt="" />
              </button>
              <div className={styles.imageWrap}>
                {images.slice(0, 4).map((el) => (
                  <img src={el} alt="" />
                ))}
              </div>
              <button
                className={`${styles.arrowRight} ${styles.arrowSecondary}`}
                onClick={() => {
                  const array = [...images];
                  array.push(array.shift()!);
                  setImages(array);
                }}
              >
                <img src={arrow} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {similarSkills.length !== 0 && (
        <>
          <h2 className={styles.titlecard}>Похожие предложения</h2>
          <div className={styles.wrapcards}>
            {skip !== 0 && similarSkills.length <= 4 && (
              <button
                className={styles.arrowLeft}
                onClick={() => {
                  setSkip(skip - 1);
                }}
              >
                <img src={arrow} alt="" />
              </button>
            )}
            {similarSkills.slice(skip, skip + 4).map((el, index) => (
              <Card {...el} id={index.toString()} isHeartDisplay />
            ))}
            {similarSkills.length > skip + 4 && similarSkills.length > 4 && (
              <button
                className={styles.arrowRight}
                onClick={() => {
                  setSkip(1 + skip);
                }}
              >
                <img src={arrow} alt="" />
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};
