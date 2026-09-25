import styles from "./registerStepThreeLeft.module.css";
import galleryAdd from "../../../shared/icon/assets/gallery-add.svg";
import { Selector } from "../../../shared/ui/selector";
import { Input } from "../input";
import { useRef, useState, type FormEvent } from "react";
import * as yup from "yup";
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

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Название навыка"
        type="text"
        placeHolder="Введите название вашего навыка"
        value={nameSkill}
        onchange={setNameSkill}
        textError={error.nameSkill || ""}
        error={!!error.nameSkill}
      />

      <Selector
        label="Категория навыка"
        options={[]}
        placeHolder="Выберите категорию навыка"
        value="dsa"
        textError={error.categorySkill || ""}
        error={!!error.categorySkill}
      />
      <Selector
        label="Подкатегория навыка"
        options={[]}
        placeHolder="Выберите подкатегорию навыка"
        value="dsa"
        textError={error.subCategorySkill || ""}
        error={!!error.subCategorySkill}
      />
      <div className={styles.wraps}>
        <label htmlFor="decription" className={styles.label}>
          Описание
        </label>
        <textarea
          id="decription"
          placeholder="Коротко опишите, чему можете научить"
          className={styles.description}
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
        <input type="file" accept="image/*" ref={inputRef} hidden />
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
