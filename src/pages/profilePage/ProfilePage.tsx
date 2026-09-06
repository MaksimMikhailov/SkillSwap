import styles from "./profilePage.module.css";
import image from "../../shared/icon/assets/Image.png";
import share from "../../shared/icon/assets/share.svg";
import moreSquare from "../../shared/icon/assets/more-square.svg";
import image1 from "../../shared/icon/assets/Image1.png";
import image2 from "../../shared/icon/assets/Image2.png";
import image3 from "../../shared/icon/assets/Image3.png";
import image4 from "../../shared/icon/assets/image4.png";
import arrow from "../../shared/icon/assets/chevron-right.svg";
import { Card } from "../../components/ui/card";
import { Like } from "../../components/ui/like";
import { useState } from "react";
import type { IUserInfo } from "../../components/ui/card/Card";
import type { Skills } from "../../shared/lib/types";
export interface profileData {
  userInfo: IUserInfo;
  teachskills: Skills[];
  learnskills: Skills[];
}
export const ProfilePage = () => {
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(0);
  const [skip, setSkip] = useState(0);

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
    {
      learnskills: ["Медитация", "Английский язык", "Бизнес-план"],
      teachskills: ["Медитация", "Английский язык", "Бизнес-план"],
      userInfo: { age: 12, image: image, name: "Никита", city: "Питер" },
    },
    {
      learnskills: ["Медитация", "Английский язык", "Бизнес-план"],
      teachskills: ["Медитация", "Английский язык", "Бизнес-план"],
      userInfo: { age: 43342, image: image, name: "Никита", city: "Питер" },
    },
  ];
  return (
    <>
      <div className={styles.profile}>
        <Card
          learnskills={["Медитация", "Английский язык", "Бизнес-план"]}
          teachskills={["Медитация", "Английский язык", "Бизнес-план"]}
          userInfo={{ age: 12, image: image, name: "Никита", city: "Питер" }}
          id="1"
          description="Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое"
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
            <img src={share} alt="" />
            <img src={moreSquare} alt="" />
          </div>
          <div className={styles.wrapDescription}>
            <div className={styles.description}>
              <h1 className={styles.title}>Игра на барабанах</h1>
              <p className={styles.link}>
                Творчество и искусство / Музыка и звук
              </p>
              <p className={styles.text}>
                Привет! Я играю на барабанах уже больше 10 лет — от репетиций
                в гараже до выступлений на сцене с живыми группами. Научу
                основам техники (и как не отбить себе пальцы), играть любимые
                ритмы и разбирать песни, импровизировать и звучать уверенно
                даже без паритуры
              </p>
              <button className={styles.button}>Предложить обмен</button>
            </div>
            <div className={styles.imageWrap}>
              <img src={image1} className={styles.imageLarge} alt="" />

              <img src={image2} alt="" />
              <img src={image3} alt="" />
              <img src={image4} alt="" />
            </div>
          </div>
        </div>
      </div>
      <h2 className={styles.titlecard}>Похожие предложения</h2>
      <div className={styles.wrapcards}>
        {skip !== 0 && (
          <button
            className={styles.arrowLeft}
            onClick={() => {
              setSkip(skip - 1);
            }}
          >
            <img src={arrow} alt="" />
          </button>
        )}
        {array.slice(skip, skip + 4).map((el, index) => (
          <Card {...el} id={index.toString()} isHeartDisplay />
        ))}
        {array.length > skip + 4 && (
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
  );
};
