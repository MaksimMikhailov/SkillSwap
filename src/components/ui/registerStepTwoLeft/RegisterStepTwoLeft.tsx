import styles from "./registerStepTwoLeft.module.css";
import addIcon from "../../../shared/icon/assets/Icon+Add.svg";

import { Input } from "../input";
import { useRef, useState, type FormEvent } from "react";
import { Selector } from "../../../shared/ui/selector";

import * as yup from "yup";
import { useSelector } from "react-redux";
import type { RootState } from "../../../services/store";
import {
  getCategoryOption,
  getSubCategoryOption,
} from "../../../shared/lib/helpers";
import type { Option } from "../../../shared/ui/selector/Selector";

export interface IInfo {
  name: string;
  date: string;
  gender: string;
  city: string;
  category: string;
  subCategory: string;
  image: string;
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
  const [image, setImage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [userCity, setCity] = useState("");
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [userCategory, setCategory] = useState<string[]>([]);

  const schema = yup.object({
    name: yup.string().required("Введите имя"),
    date: yup.string().required("Введите дату"),
    gender: yup.string().required("Введите пол"),
    city: yup.string().required("Введите город"),
    category: yup.string().required("Введите категорию"),
    subCategory: yup.string().required("Введите подкатегорию"),
    image: yup.string().required("Выберите изображение"),
  });
  const { category, city } = useSelector((state: RootState) => state.user);
  const selectorCategoryies = userCategory.map(
    (itemuser) =>
      category.find((itemcategory) => itemcategory.id === itemuser)?.name || "",
  );
  const selectorSubCategory = userCategory.reduce((acc, id) => {
    const currentCategory = category.find(
      (item) => item.id === id,
    )?.subcategories;
    if (currentCategory) {
      currentCategory.forEach((el) => {
        const subCategory = { label: el.name, value: el.id };
        acc.push(subCategory);
      });
    }
    return acc;
  }, [] as Option[]);
  const sub = category.flatMap((el) => el.subcategories);
  const selectorSubCategoryies = subCategory.map(
    (itemuser) =>
      sub.find((itemcategory) => itemcategory.id === itemuser)?.name || "",
  );

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const validate = await schema.validate(
        {
          name: IsNamed,
          date,
          gender,
          city: userCity,
          category: userCategory,
          subCategory,
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
  const cityOptions = city.map((el) => ({
    value: el.id,
    label: el.name,
  }));
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => setImage(String(reader.result));
          reader.readAsDataURL(file);
        }}
      />
      <img
        src={image || addIcon}
        alt=""
        onClick={() => {
          inputRef.current?.click();
        }}
        className={styles.image}
      />
      {error.image && <p className={styles.date}>Выберите изображение</p>}
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
            onChange={(event) => setDate(event.target.value)}
            value={date}
          />
          {error.date && <p className={styles.date}>Введите дату</p>}
        </div>
        <Selector
          label="Пол"
          options={[
            { value: "Мужской", label: "Мужской" },
            { value: "Женский", label: "Женский" },
          ]}
          placeHolder="Не указано"
          onChange={setGender}
          value={gender}
          textError={error.gender || ""}
          error={!!error.gender}
        />
      </div>

      <Selector
        label="Город"
        options={cityOptions}
        placeHolder="Не указано"
        onChange={setCity}
        value={userCity}
        textError={error.city || ""}
        error={!!error.city}
      />
      <Selector
        label="Категория навыка, которому хотите научиться"
        options={getCategoryOption(category)}
        placeHolder="Выберите категорию"
        onChange={setCategory}
        value={selectorCategoryies}
        textError={error.category || ""}
        error={!!error.category}
        multiPlay
        selectorCategories={selectorCategoryies}
      />
      <Selector
        label="Подкатегория навыка, которому хотите научиться"
        options={selectorSubCategory}
        placeHolder="Выберите подкатегорию"
        onChange={setSubCategory}
        value={selectorSubCategoryies}
        textError={error.subCategory || ""}
        error={!!error.subCategory}
        multiPlay
        selectorCategories={selectorSubCategoryies}
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
