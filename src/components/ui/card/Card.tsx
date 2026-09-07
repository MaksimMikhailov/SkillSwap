import { useState } from "react";
import styles from "./card.module.css";
import { UserInfo } from "../userInfo";
import type { Skills } from "../../../shared/lib/types";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../../shared/lib/constants";
import { boolean } from "yup";
export interface IUserInfo {
  image: string;
  name: string;
  city: string;
  age: number;
}

interface CardProps {
  userInfo: IUserInfo;
  teachskills: Skills[];
  learnskills: Skills[];
  likesCount?: number;
  id: string;
  description?: string;
  isHeartDisplay?: boolean;

  hasProfile?: boolean;
}
export function Card({
  userInfo,
  teachskills,
  learnskills,
  likesCount,
  id,
  description,
  isHeartDisplay,

  hasProfile = true,
}: CardProps) {
  const skillColors = {
    "Английский язык": "#EBE5C5",
    "Тайм менеджмент": "#E7F2F6",
    Медитация: "#E9F7E7",
    "Бизнес-план": "#EEE7F7",
    "Игра на барабанах": "#F7E7F2",
    "Реставрация мебели": "#F7EBE5",
  };

  return (
    <div className={`${styles.card} ${!hasProfile ? styles.cardProfile : ""}`}>
      <UserInfo
        {...userInfo}
        likesCount={likesCount}
        isHeartDisplay={isHeartDisplay}
      />
      {description && <p className={styles.description}>{description}</p>}
      <div className={styles.wrapSkills}>
        <div className={styles.teachskills}>
          <strong className={styles.titles}>Может научить:</strong>
          <div className={styles.skills}>
            {teachskills.slice(0, 2).map((el) => (
              <div
                className={styles.skill}
                style={{ backgroundColor: skillColors[el] }}
              >
                {el}
              </div>
            ))}
            {learnskills.length > 2 && (
              <div
                className={styles.skill}
                style={{ backgroundColor: "#E8ECF7" }}
              >
                +{learnskills.length - 2}
              </div>
            )}
          </div>
        </div>
        <div className={styles.learnskills}>
          <strong className={styles.titles}>Хочет научиться:</strong>
          <div className={styles.skills}>
            {learnskills.slice(0, 2).map((el) => (
              <div
                className={styles.skill}
                style={{ backgroundColor: skillColors[el] }}
              >
                {el}
              </div>
            ))}
            {learnskills.length > 2 && (
              <div
                className={styles.skill}
                style={{ backgroundColor: "#E8ECF7" }}
              >
                +{learnskills.length - 2}
              </div>
            )}
          </div>
        </div>
      </div>
      {hasProfile && (
        <Link
          to={`${routes.skill.replace(":id", id)}`}
          className={styles.button}
        >
          Подробнее
        </Link>
      )}
    </div>
  );
}
