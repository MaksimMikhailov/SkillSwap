import { HeaderLogo } from "../../shared/icon";
import styles from "./registerPage.module.css";
import BtnClose from "../../shared/icon/assets/Icon right.svg";
import { RegistrationLayout } from "../../components/ui/registrationLayout";
import { RegisterStepOneLeft } from "../../components/ui/registerStepOneLeft";
import { RegisterStepTwoLeft } from "../../components/ui/registerStepTwoLeft";
import { RegisterStepThreeLeft } from "../../components/ui/registerStepThreeLeft";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Steps } from "../../components/ui/registrationLayout/RegistrationLayout";
import { RegisterStepRight } from "../../components/ui/registerStepOneRight";
import LigthBulb from "../../shared/icon/assets/light-bulb.svg";
import UserInfo from "../../shared/icon/assets/user info.svg";
import SchoolBoard from "../../shared/icon/assets/school-board.svg";
import type { IInfo } from "../../components/ui/registerStepTwoLeft/RegisterStepTwoLeft";
import { useState } from "react";
import { RegisterModal } from "../../components/modals/registerModal";
import { useDispatch } from "react-redux";
import { actionSetAuth } from "../../services/store/slice/authSlice";
export interface IAuth {
  login: string;
  password: string;
}
export interface IInfoUser {
  title: string;
  category: string;
  subCategory: string;
  description: string;
  images: string[];
}
export const RegisterPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const stateStep = parseStep(searchParams.get("step"));
  const [skill, setSkill] = useState<IInfoUser | null>(null);
  const [auth, setAuth] = useState<IAuth | null>(null);
  const [info, setInfo] = useState<IInfo | null>(null);
  const navigate = useNavigate();
  function goToStep(step: Steps) {
    setSearchParams({ step: String(step) });
  }
  function submitAuth(value: IAuth) {
    setAuth(value);
    handleNext();
  }
  function submitInfo(value: IInfo) {
    setInfo(value);
    handleNext();
  }
  function submitSkill(value: IInfoUser) {
    setSkill(value);
    setIsModalOpen(true);
  }
  function handleNext() {
    goToStep((stateStep + 1) as Steps);
  }

  function handleBack() {
    goToStep((stateStep - 1) as Steps);
  }

  function parseStep(value: string | null): Steps {
    if (value === "2") return 2;
    if (value === "3") return 3;
    return 1;
  }
  const dispatch = useDispatch();
  function getCurrentStep(step: Steps) {
    switch (step) {
      case 1:
        return <RegisterStepOneLeft onSubmit={submitAuth} />;
      case 2:
        return (
          <RegisterStepTwoLeft onBack={handleBack} onSubmit={submitInfo} />
        );
      case 3:
        return (
          <>
            <RegisterStepThreeLeft onBack={handleBack} onSubmit={submitSkill} />
            {isModalOpen && (
              <RegisterModal
                setIsModalOpen={setIsModalOpen}
                submitModal={() => {
                  const objData = {
                    login: auth?.login,
                    password: auth?.password,
                    image: info?.image,
                    name: info?.name,
                  };
                  dispatch(actionSetAuth(objData));
                  navigate("/");
                }}
                previewSkill={skill}
              />
            )}
          </>
        );
    }
  }
  function getCurrentStepRight(step: Steps) {
    switch (step) {
      case 1:
        return (
          <RegisterStepRight
            image={LigthBulb}
            title="Добро пожаловать в SkillSwap!"
            text="Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми"
          />
        );
      case 2:
        return (
          <RegisterStepRight
            image={UserInfo}
            title="Расскажите немного о себе"
            text="Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена"
          />
        );
      case 3:
        return (
          <RegisterStepRight
            image={SchoolBoard}
            title="Укажите, чем вы готовы поделиться"
            text="Так другие люди смогут увидеть ваши предложения и предложить вам обмен!"
          />
        );
    }
  }
  return (
    <>
      <header>
        <div className={styles.container}>
          <img
            src={HeaderLogo}
            alt=""
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          <button className={styles.headerBtn} onClick={() => navigate("/")}>
            Закрыть <img src={BtnClose} alt="" />
          </button>
        </div>
      </header>
      <main>
        <RegistrationLayout
          stepCurrent={stateStep}
          leftContent={getCurrentStep(stateStep)}
          rightContent={getCurrentStepRight(stateStep)}
        />
      </main>
    </>
  );
};
