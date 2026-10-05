import styles from "./card.module.css";
import { UserInfo } from "../userInfo";
import { Link } from "react-router-dom";
import { routes } from "../../../shared/lib/constants";
import type { RootState } from "../../../services/store";
import { useSelector } from "react-redux";

export interface IUserInfo {
  image: string;
  name: string;
  city: string;
  age: number;
}

interface CardProps {
  userInfo: IUserInfo;
  teachskills: string[];
  learnskills: string[];
  likesCount?: number;
  id?: string;
  description?: string;
  isHeartDisplay?: boolean;
  showSkill?: boolean;
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
  showSkill,
}: CardProps) {
  const skillColors = {
    "Бизнес и карьера": "#EBE5C5",
    "Иностранные языки": "#E7F2F6",
    "Дом и уют": "#E9F7E7",
    "Творчество и искусство": "#EEE7F7",
    "Образование и развитие": "#F7E7F2",
    "Здоровье и лайфстайл": "#F7EBE5",
  };
  const { category } = useSelector((state: RootState) => state.user);
  function findCategory(subcategory: string) {
    let categoryName = "";
    category.forEach((el) => {
      if (el.subcategories.find((el) => el.name === subcategory)) {
        categoryName = el.name;
        return;
      }
    });

    return categoryName;
  }
  function getShowSkills() {
    if (showSkill) {
      return learnskills.length;
    }
    return 2;
  }
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
            {teachskills?.slice(0, getShowSkills()).map((el) => (
              <div
                className={styles.skill}
                style={{
                  backgroundColor:
                    skillColors[findCategory(el) as keyof typeof skillColors],
                }}
              >
                {el}
              </div>
            ))}
            {teachskills?.length > 2 && (
              <div
                className={styles.skill}
                style={{ backgroundColor: "#E8ECF7" }}
              >
                +{teachskills.length - 2}
              </div>
            )}
          </div>
        </div>
        <div className={styles.learnskills}>
          <strong className={styles.titles}>Хочет научиться:</strong>
          <div
            className={styles.skills}
            style={{ flexWrap: showSkill ? "wrap" : "nowrap" }}
          >
            {learnskills?.slice(0, getShowSkills()).map((el) => (
              <div
                className={styles.skill}
                style={{
                  backgroundColor:
                    skillColors[findCategory(el) as keyof typeof skillColors],
                }}
              >
                {el}
              </div>
            ))}
            {learnskills?.length > 2 && !showSkill && (
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
      {hasProfile && id && (
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
