import { useState } from "react";
import styles from "./userInfo.module.css";
import { Like } from "../like";
interface UserInfoProps {
  image: string;
  name: string;
  city: string;
  age: number;
  isHeartDisplay?: boolean;
  setCount?: (count: number) => void;
  count?: number;
}
export function UserInfo({
  image,
  name,
  city,
  age,
  isHeartDisplay,
  setCount,
  count,
}: UserInfoProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.container}>
      <img src={image} alt="" className={styles.image} />
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
