import styles from "./profilePage.module.css";
import { useState } from "react";
import request from "../../shared/icon/assets/request.svg";
import messageText from "../../shared/icon/assets/message-text.svg";
import likeProfile from "../../shared/icon/assets/likeProfile.svg";
import idea from "../../shared/icon/assets/idea.svg";
import user from "../../shared/icon/assets/user.svg";
import { PersonalData } from "../../components/personalData";
import { Favorite } from "../../components/favorite";
import { useSearchParams } from "react-router-dom";
import { Request } from "../../components/request";
export const ProfilePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(
    searchParams.get("tab") === "favorite" ? "Избранное" : "Личный кабинет",
  );
  function getCurrentStep() {
    console.log(currentStep);
    switch (currentStep) {
      case "Заявки":
        return <Request />;
        break;
      case "Мои обмены":
        break;
      case "Избранное":
        return <Favorite />;
        break;
      case "Мои навыки":
        break;

      default:
        return <PersonalData />;
        break;
    }
  }
  const navigationContent = [
    { name: "Заявки", image: request },
    { name: "Мои обмены", image: messageText },
    { name: "Избранное", image: likeProfile },
    { name: "Мои навыки", image: idea },
    { name: "Личные данные", image: user },
  ];
  return (
    <div className={styles.main}>
      <div className={styles.globalProfileList}>
        <ul className={styles.profileList}>
          {navigationContent.map((item, index) => (
            <li
              key={index}
              className={currentStep === item.name ? styles.active : ""}
              onClick={() => setCurrentStep(item.name)}
            >
              <img src={item.image} alt={item.name} />
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`${styles.globalElementImageAndInput} ${currentStep === "Избранное" ? styles.deleteBackground : ""} ${currentStep === "Заявки" ? styles.deletePadding : ""}`}
      >
        {getCurrentStep()}
      </div>
    </div>
  );
};
