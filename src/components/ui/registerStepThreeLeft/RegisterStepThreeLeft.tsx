import styles from "./registerStepThreeLeft.module.css";
import galleryAdd from "../../../shared/icon/assets/gallery-add.svg";
import { Selector } from "../../../shared/ui/selector";
import { Input } from "../input";
import { useRef, useState, type FormEvent } from "react";
import * as yup from "yup";
import {
  getCategoryOption,
  getSubCategoryOption,
} from "../../../shared/lib/helpers";
import type { RootState } from "../../../services/store";
import { useSelector } from "react-redux";
import type { Option } from "../../../shared/ui/selector/Selector";

export interface ISkill {
  nameSkill: string;
  categorySkill: string;
  subCategorySkill: string;
  description: string;
}
interface IRegisterStepThreeLeftProps {
  onBack: () => void;
  onSubmit: (value: ISkill) => void;
}

export function RegisterStepThreeLeft({
  onBack,
  onSubmit,
}: IRegisterStepThreeLeftProps) {
  const [error, setError] = useState<Partial<ISkill>>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const [nameSkill, setNameSkill] = useState("");
  const [categorySkill, setCategorySkill] = useState("");
  const [subCategorySkill, setSubCategorySkill] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [userCategory, setCategory] = useState<string[]>([]);

  const { category } = useSelector((state: RootState) => state.user);
  const schema = yup.object({
    nameSkill: yup.string().required("Введите имя навыка"),
    categorySkill: yup.string().required("Введите категорию навыка"),
    subCategorySkill: yup.string().required("Введите подкатегорию навыка"),
    description: yup.string().required("Введите описание"),
  });
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const validate = await schema.validate(
        {
          nameSkill: "",
          categorySkill: "",
          subCategorySkill: "",
          description: "",
        },
        { abortEarly: false },
      );
      onSubmit(validate as ISkill);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const nextErrors: Partial<ISkill> = {};
        for (const element of error.inner) {
          const key = element.path as keyof ISkill;
          nextErrors[key] = element.message;
        }
        setError(nextErrors);
      }
    }
  }

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

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Название навыка"
        type="text"
        placeHolder="Введите название вашего навыка"
        onchange={setNameSkill}
        value={nameSkill}
        textError={error.nameSkill || ""}
        error={!!error.nameSkill}
      />

      <Selector
        label="Категория навыка"
        options={getCategoryOption(category)}
        placeHolder="Выберите категорию навыка"
        onChange={setCategory}
        value={selectorCategoryies}
        textError={""}
        error={false}
        multiPlay
        selectorCategories={selectorCategoryies}
      />
      <Selector
        label="Подкатегория навыка"
        options={selectorSubCategory}
        placeHolder="Выберите подкатегорию навыка"
        onChange={setSubCategory}
        value={selectorSubCategoryies}
        textError={""}
        error={false}
        multiPlay
        selectorCategories={selectorSubCategoryies}
      />
      <div className={styles.wraps}>
        <label htmlFor="decription" className={styles.label}>
          Описание
        </label>
        <textarea
          id="decription"
          placeholder="Коротко опишите, чему можете научить"
          className={styles.description}
          onInput={(event) => {
            setDescription(event.currentTarget.value);
          }}
          value={description}
        ></textarea>
      </div>
      <div
        className={styles.selectImage}
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        <p className={styles.selectText}>
          Перетащите или выберите изображения навыка
        </p>
        {image && <img src={image} alt="" />}
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
        <div className={styles.inputFile}>
          <img src={galleryAdd} alt="" />
          <p>Выбрать изображения</p>
        </div>
      </div>
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
