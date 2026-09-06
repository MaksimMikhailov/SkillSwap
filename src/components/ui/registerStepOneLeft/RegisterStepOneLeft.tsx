import styles from "./registerStepOneLeft.module.css";
import BtnGoogle from "../../../shared/icon/assets/Google.svg";
import BtnApple from "../../../shared/icon/assets/Apple.svg";
import Eye from "../../../shared/icon/assets/eye.svg";
import EyeSlash from "../../../shared/icon/assets/eye-slash.svg";
import { useState, type FormEvent } from "react";
import { Input } from "../input";
import type { IAuth } from "../../../pages/registerPage/RegisterPage";
import * as yup from "yup";
export interface IRegisterStepOneLeftProps {
  onBack?: () => void;
  onSubmit: (value: IAuth) => void;
}

export function RegisterStepOneLeft({ onSubmit }: IRegisterStepOneLeftProps) {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState({ password: "", login: "" });
  const schema = yup.object({
    login: yup.string().required("Неверный email"),
    password: yup
      .string()
      .required("Пароль не может быть пустым")
      .min(8, "Пароль должен содержать не менее 8 знаков"),
  });
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const validate = await schema.validate(
        { login: mail, password },
        { abortEarly: false },
      );
      onSubmit(validate as IAuth);
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
          onchange={setMail}
          label="Email"
          textError={error.login}
          value={mail}
          error={!!error.login}
        />
        <Input
          placeHolder="Придумайте надёжный пароль"
          type={isPasswordVisible ? "text" : "password"}
          onchange={setPassword}
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
      <button className={styles.buttonPrimary} type="submit">
        Далее
      </button>
    </form>
  );
}
