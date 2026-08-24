import { useState } from "react";
import { Card } from "../../components/ui/card";
import { UserInfo } from "../../components/ui/userInfo";
import image from "../../shared/icon/assets/Image.png";
import styles from "./mainPage.module.css";
export const MainPage = () => {
  const [count, setCount] = useState(0);
  return (
    <Card
      learnskills={["Медитация", "Английский язык", "Бизнес-план"]}
      teachskills={["Медитация", "Английский язык", "Бизнес-план"]}
      userInfo={{ age: 12, image: image, name: "Никита", city: "Питер" }}
      id="1"
      isHeartDisplay
      likesCount={count}
      setCount={setCount}
    />
  );
};
