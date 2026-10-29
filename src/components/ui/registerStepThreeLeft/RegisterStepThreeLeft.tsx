import styles from "./registerStepThreeLeft.module.css";
import galleryAdd from "../../../shared/icon/assets/gallery-add.svg";
import { Selector } from "../../../shared/ui/selector";
import { Input } from "../input";
import { useRef, useState, type FormEvent } from "react";
import * as yup from "yup";
import { getCategoryOption } from "../../../shared/lib/helpers";
import type { RootState } from "../../../services/store";
import { useSelector } from "react-redux";
import type { Option } from "../../../shared/ui/selector/Selector";
import type { IInfoUser } from "../../../pages/registerPage/RegisterPage";

export interface ISkill {
  nameSkill: string;
  categorySkill: string;
  subCategorySkill: string;
  description: string;
}
interface IRegisterStepThreeLeftProps {
  onBack: () => void;
  onSubmit: (value: IInfoUser) => void;
}

export function RegisterStepThreeLeft({
  onBack,
  onSubmit,
}: IRegisterStepThreeLeftProps) {
  const [error, setError] = useState<Partial<ISkill>>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const [nameSkill, setNameSkill] = useState("");

  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [userCategory, setCategory] = useState<string[]>([]);
  const { category } = useSelector((state: RootState) => state.user);
  const [isDragActive, setIsDragActive] = useState(false);
  const schema = yup.object({
    title: yup.string().required("Введите имя навыка"),
    category: yup.string().required("Введите категорию навыка"),
    subCategory: yup.string().required("Введите подкатегорию навыка"),
    description: yup.string().required("Введите описание"),
  });
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const validate = await schema.validate(
        {
          title: nameSkill,
          category: selectorCategoryies[0],
          subCategory: selectorSubCategoryies[0],
          description,
          images: image,
        },
        { abortEarly: false },
      );
      onSubmit(validate as IInfoUser);
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
  function addImage(file: FileList) {
    const imageFiles = Array.from(file).filter((el) =>
      el.type.startsWith("image"),
    );
    const readers = imageFiles.map(
      (el) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(el);
        }),
    );
    Promise.all(readers).then((el) => {
      setImage((prev) => [...prev, ...el.filter((el) => !prev.includes(el))]);
    });
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
  console.log(selectorSubCategoryies);
  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Название навыка"
        type="text"
        placeHolder="Введите название вашего навыка"
        onChange={(event) => setNameSkill(event.target.value)}
        value={nameSkill}
        textError={error.nameSkill || ""}
        error={!!error.nameSkill}
        maxLength={12}
      />
      <Selector
        label="Категория навыка"
        options={getCategoryOption(category)}
        placeHolder="Выберите категорию навыка"
        onChange={setCategory}
        value={userCategory}
        textError={error.categorySkill || ""}
        error={!!error.categorySkill}
        multiPlay
        selectorCategories={selectorCategoryies}
      />
      <Selector
        label="Подкатегория навыка"
        options={selectorSubCategory}
        placeHolder="Выберите подкатегорию навыка"
        onChange={setSubCategory}
        value={subCategory}
        textError={error.subCategorySkill || ""}
        error={!!error.subCategorySkill}
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
          maxLength={250}
        ></textarea>
        {error.description && (
          <p className={styles.error}>{error.description}</p>
        )}
      </div>
      <div
        className={`${styles.selectImage} ${isDragActive ? styles.dragActive : ""}`}
        onClick={() => {
          inputRef.current?.click();
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragActive(true);
        }}
        onDragLeave={(event) => {
          if (
            !event?.currentTarget.contains(event.relatedTarget as Node | null)
          )
            setIsDragActive(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragActive(false);
          addImage(event.dataTransfer.files);
        }}
        onDragOver={(event) => {
          event.preventDefault();
        }}
      >
        <p className={styles.selectText}>
          Перетащите или выберите изображения навыка
        </p>
        <div className={styles.wrapsImages}>
          {!!image.length && image.map((el) => <img src={el} />)}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          hidden
          onChange={(event) => {
            if (event.target.files) addImage(event.target.files);
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
