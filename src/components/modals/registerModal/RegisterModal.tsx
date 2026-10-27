import { useState } from "react";
import styles from "./register.module.css";
import arrow from "../../../shared/icon/assets/chevron-right.svg";
import editIcon from "../../../shared/icon/assets/edit.svg";
interface RegisterModalProps {
  setIsModalOpen: (value: boolean) => void;
  submitModal: () => void;
  previewSkill: {
    title: string;
    category: string;
    subCategory: string;
    description: string;
    images: string[];
  } | null;
}
export function RegisterModal({
  setIsModalOpen,
  submitModal,
  previewSkill,
}: RegisterModalProps) {
  if (!previewSkill) return <div>Loading</div>;
  const [images, setImages] = useState(previewSkill.images);
  return (
    <>
      <div className={styles.container}></div>
      <div className={styles.global}>
        <div className={styles.titlesWrap}>
          <h1 className={styles.title}>Ваше предложение</h1>
          <p className={styles.textTitles}>
            Пожалуйста, проверьте и подтвердите правильность данных
          </p>
        </div>
        <div className={styles.wrapProfile}>
          <div className={styles.wrapDescription}>
            <div className={styles.description}>
              <h1 className={styles.titleH1}>{previewSkill.title}</h1>
              <p
                className={styles.link}
              >{`${previewSkill.category} / ${previewSkill.subCategory}`}</p>
              <p className={styles.text}>{previewSkill.description}</p>
              <div className={styles.buttonWrap}>
                <button
                  className={styles.buttonEdit}
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  Редактировать <img src={editIcon} alt="" />
                </button>
                <button className={styles.buttonCurrect} onClick={submitModal}>
                  Готово
                </button>
              </div>
            </div>
            <div className={styles.wrapper}>
              <button
                className={`${styles.arrowLeft} ${styles.arrowSecondary}`}
                onClick={() => {
                  const array = [...images];
                  array.unshift(array.pop()!);
                  setImages(array);
                }}
              >
                <img src={arrow} alt="" />
              </button>
              <div className={styles.imageWrap}>
                {images.slice(0, 4).map((el) => (
                  <img src={el} alt="" />
                ))}
              </div>
              <button
                className={`${styles.arrowRight} ${styles.arrowSecondary}`}
                onClick={() => {
                  const array = [...images];
                  array.push(array.shift()!);
                  setImages(array);
                }}
              >
                <img src={arrow} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
