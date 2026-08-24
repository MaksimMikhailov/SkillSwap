import styles from "./registerStepTwoLeft.module.css";
import addIcon from "../../../shared/icon/assets/Icon+Add.svg";

import { Input } from "../input";
import { useState, type FormEvent } from "react";
import { Selector } from "../../../shared/ui/selector";
import * as yup from "yup";
export interface IInfo {
  name: string;
  date: string;
  gender: string;
  city: string;
  category: string;
  subCategory: string;
}
export interface IRegisterStepTwoLeftProps {
  onBack?: () => void;
  onSubmit: (value: IInfo) => void;
}
export function RegisterStepTwoLeft({
  onBack,
  onSubmit,
}: IRegisterStepTwoLeftProps) {
  const [error, setError] = useState<Partial<IInfo>>({});
  const [IsNamed, setIsNamed] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const schema = yup.object({
    name: yup.string().required("Введите имя"),
    date: yup.string().required("Введите дату"),
    gender: yup.string().required("Введите полы"),
    city: yup.string().required("Введите город"),
    category: yup.string().required("Введите категорию"),
    subCategory: yup.string().required("Введите подкатегорию"),
  });
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const validate = await schema.validate(
        {
          name: IsNamed,
          date: "",
          gender: "",
          city: "",
          category: "",
          subCategory: "",
        },
        { abortEarly: false },
      );
      onSubmit(validate as IInfo);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const nextErrors: Partial<IInfo> = {};
        for (const element of error.inner) {
          const key = element.path as keyof IInfo;
          nextErrors[key] = element.message;
        }
        setError(nextErrors);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <img src={addIcon} alt="" className={styles.image} />
      <Input
        label="Имя"
        onchange={setIsNamed}
        value={IsNamed}
        type="text"
        placeHolder="Введите ваше имя"
        textError={error.name || ""}
        error={!!error.name}
      />
      <div className={styles.wrapsDateGende}>
        <div className={styles.wraps}>
          <label htmlFor="date" className={styles.label}>
            Дата
          </label>
          <input
            type="date"
            placeholder="дд.мм.гггг"
            className={styles.input}
            id="date"
          />
        </div>
        <Selector
          label="Пол"
          options={[
            { value: "Мужской", label: "Мужской" },
            { value: "Женский", label: "Женский" },
          ]}
          placeHolder="Не указано"
          value=""
          textError={error.gender || ""}
          error={!!error.gender}
        />
      </div>

      <Selector
        label="Город"
        options={[{ value: "Москва", label: "Москва" }]}
        placeHolder="Не указано"
        value=""
        textError={error.city || ""}
        error={!!error.city}
      />
      <Selector
        label="Категория навыка, которому хотите научиться"
        options={[]}
        placeHolder="Выберите категорию"
        value=""
        textError={error.category || ""}
        error={!!error.category}
      />
      <Selector
        label="Подкатегория навыка, которому хотите научиться"
        options={[]}
        placeHolder="Выберите подкатегорию"
        value=""
        textError={error.subCategory || ""}
        error={!!error.subCategory}
      />
      <div className={styles.btnWrap}>
        <button className={styles.btnBack} type="button" onClick={onBack}>
          Назад
        </button>
        <button className={styles.btnGo} type="submit">
          Продолжить
        </button>
      </div>
    </form>
  );
}
