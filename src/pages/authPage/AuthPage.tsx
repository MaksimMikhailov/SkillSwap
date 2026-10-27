import styles from "./authPage.module.css";
import { Link } from "react-router-dom";
import BtnGoogle from "../../shared/icon/assets/Google.svg";
import BtnApple from "../../shared/icon/assets/Apple.svg";
import LightBuld from "../../shared/icon/assets/light-bulb.svg";
import Eye from "../../shared/icon/assets/eye.svg";
import EyeSlash from "../../shared/icon/assets/eye-slash.svg";
import { useState, type FormEvent } from "react";
import BtnClose from "../../shared/icon/assets/Icon right.svg";
import * as yup from "yup";
import { Input } from "../../components/ui/input";
import type { IAuth } from "../registerPage/RegisterPage";
import { RegistrationLayout } from "../../components/ui/registrationLayout";
import { RegisterStepRight } from "../../components/ui/registerStepOneRight";
import { HeaderLogo } from "../../shared/icon";
import { useNavigate } from "react-router-dom";
import { routes } from "../../shared/lib/constants";
import type { User } from "../../shared/lib/types";
import { useDispatch } from "react-redux";
import { actionSetAuth } from "../../services/store/slice/authSlice";

function AuthLeft() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState({ password: "", login: "" });
  const schema = yup.object({
    login: yup.string().required("Неверный email"),
    password: yup.string().required("Пароль не может быть пустым"),
  });
  const dispatch = useDispatch();
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await schema.validate({ login: mail, password }, { abortEarly: false });
      const userInfo = localStorage.getItem("userInfo");
      if (!userInfo) return;
      const user = JSON.parse(userInfo) as User;
      if (user.password === password && user.login === mail) {
        dispatch(actionSetAuth(user));
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const nextErrors: IAuth = { login: "", password: "" };
        for (const element of error.inner) {
          const key = element.path as keyof IAuth;
          nextErrors[key] = element.message;
        }
        setError(nextErrors);
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.wrapBtn}>
          <button className={styles.button} type="button">
            <img src={BtnGoogle} alt="" /> Продолжить с Google
          </button>
          <button className={styles.button} type="button">
            <img src={BtnApple} alt="" />
            Продолжить с Apple
          </button>
        </div>
        <div className={styles.wrapLines}>
          <div className={styles.line}></div>
          <p className={styles.textOr}>или</p>
          <div className={styles.line}></div>
        </div>
        <div className={styles.wrapInputLabel}>
          <Input
            placeHolder="Введите email"
            type="email"
            onChange={(event) => setMail(event.target.value)}
            label="Email"
            textError={error.login}
            value={mail}
            error={!!error.login}
          />
          <Input
            placeHolder="Введите ваш пароль"
            type={isPasswordVisible ? "text" : "password"}
            onChange={(event) => setPassword(event.target.value)}
            label="Пароль"
            textError={error.password}
            value={password}
            rightIcon={isPasswordVisible ? EyeSlash : Eye}
            setStateIcon={() => {
              setIsPasswordVisible(!isPasswordVisible);
            }}
            error={!!error.password}
          />
        </div>
        <div className={styles.buttonWrapsRegister}>
          <button className={styles.buttonPrimary} type="submit">
            Войти
          </button>
          <Link to={routes.register} className={styles.buttonRegister}>
            Зарегистрироваться
          </Link>
        </div>
      </form>
    </>
  );
}
export function AuthPage() {
  const navigate = useNavigate();
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
      <RegistrationLayout
        leftContent={<AuthLeft />}
        rightContent={
          <RegisterStepRight
            image={LightBuld}
            text="Обменивайтесь знаниями и навыками с другими людьми"
            title="С возвращением в SkillSwap!"
          />
        }
      />
    </>
  );
}
