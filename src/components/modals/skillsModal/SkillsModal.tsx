import { useState } from "react";
import styles from "./skillsModal.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../../services/store";
import book from "../../../shared/icon/assets/SkillsCaseMap/book.svg";
import briefcase from "../../../shared/icon/assets/SkillsCaseMap/briefcase.svg";
import global from "../../../shared/icon/assets/SkillsCaseMap/global.svg";
import home from "../../../shared/icon/assets/SkillsCaseMap/home.svg";
import lifestyle from "../../../shared/icon/assets/SkillsCaseMap/lifestyle.svg";
import palette from "../../../shared/icon/assets/SkillsCaseMap/palette.svg";
export function SkillsModal() {
  const categories = useSelector((state: RootState) => state.user.category);
  const cardPictures = [
    { icon: briefcase, bg: "#EEE7F7" },
    { icon: global, bg: "#EBE5C5" },
    { icon: home, bg: "#F7EBE5" },
    { icon: palette, bg: "#F7E7F2" },
    { icon: book, bg: "#E7F2F6" },
    { icon: lifestyle, bg: "#E9F7E7" },
  ];
  return (
    <div className={styles.main}>
      {categories.map((el, index) => (
        <>
          <div className={styles.mainGlobal}>
            <img
              src={cardPictures[index].icon}
              alt=""
              className={styles.img}
              style={{
                background: cardPictures[index].bg,
              }}
            />
            <div className={styles.mainWrap}>
              <h1 className={styles.title}>{el.name}</h1>
              <div className={styles.subCategories}>
                {el.subcategories.map((el) => (
                  <p className={styles.text}>{el.name}</p>
                ))}
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
