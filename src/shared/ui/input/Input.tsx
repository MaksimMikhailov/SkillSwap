import styles from "./input.module.css";
import search from "../../../shared/icon/assets/search.svg";
interface InputProps {
  placeholder: string;
  type: string;
  onchange: (value: string) => void;
}
export const Input = ({ placeholder, type, onchange }: InputProps) => {
  return (
    <div className={styles.wrapSearch}>
      <img src={search} alt="" />
      <input
        type={type}
        className={styles.search}
        onChange={(event) => onchange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};
