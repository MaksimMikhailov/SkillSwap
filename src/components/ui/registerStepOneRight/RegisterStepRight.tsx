import styles from "./registerStepRight.module.css";

interface RegisterStepRightProps {
  image: string;
  title: string;
  text: string;
}
export function RegisterStepRight({
  image,
  title,
  text,
}: RegisterStepRightProps) {
  return (
    <div className={styles.wrapper}>
      <img src={image} alt="" className={styles.image} />
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{text}</p>
    </div>
  );
}
