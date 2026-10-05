import styles from "./input.module.css";
import search from "../../../shared/icon/assets/search.svg";
interface InputProps {
  placeholder: string;
  type: string;
  onchange: (value: string) => void;
  value?: string;
}
export const Input = ({ placeholder, type, onchange, value }: InputProps) => {
  return (
    <div className={styles.wrapSearch}>
      <img src={search} alt="" />
      <input
        type={type}
        className={styles.search}
        onChange={(event) => onchange(event.target.value)}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};
