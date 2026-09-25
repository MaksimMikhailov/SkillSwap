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
}
export function UserInfo({
  image,
  name,
  city,
  age,
  isHeartDisplay,
  likesCount,
}: UserInfoProps) {
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(likesCount);
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
            }}
            active={!isActive}
            likesCount={count}
          />
        )}

        <div className={styles.description}>
          <h1 className={styles.title}>{name}</h1>
          <p className={styles.text}>
            {city}, {age} года
          </p>
        </div>
      </div>
    </div>
  );
}
