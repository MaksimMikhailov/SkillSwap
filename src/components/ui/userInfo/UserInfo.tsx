import { useState } from "react";
import styles from "./userInfo.module.css";
import { Like } from "../like";
interface UserInfoProps {
  image: string;
  name: string;
  city: string;
  age: number;
  isHeartDisplay?: boolean;
  likesCount?: number;
  count?: number;
  id?: string;
  isFavorite?: boolean;
}
export function UserInfo({
  image,
  name,
  city,
  age,
  isHeartDisplay,
  likesCount,
  id,
  isFavorite = false,
}: UserInfoProps) {
  const [isActive, setIsActive] = useState(isFavorite);
  const [count, setCount] = useState(likesCount);
  function ageString(age: number) {
    if (age === 1) {
      return "год";
    } else if (age >= 2 && age <= 4) {
      return "года";
    } else {
      return "лет";
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={image} alt="" className={styles.image} />
      </div>
      <div className={styles.wrapLike}>
        {isHeartDisplay && (
          <Like
            onClick={() => {
              setIsActive(!isActive);
              if (count === undefined || !setCount) return;
              isActive ? setCount(count - 1) : setCount(count + 1);
              const favorite = localStorage.getItem("like");
              if (favorite) {
                let favoriteIds = JSON.parse(favorite) as string[];
                if (id && favoriteIds.includes(id)) {
                  favoriteIds = favoriteIds.filter((el) => el !== id);
                } else if (id) {
                  favoriteIds.push(id);
                }
                localStorage.setItem("like", JSON.stringify(favoriteIds));
              } else {
                localStorage.setItem("like", JSON.stringify([id]));
              }
            }}
            active={!isActive}
            likesCount={count}
          />
        )}

        <div className={styles.description}>
          <h1 className={styles.title}>{name}</h1>
          <p className={styles.text}>
            {city}, {age} {ageString(age)}
          </p>
        </div>
      </div>
    </div>
  );
}
