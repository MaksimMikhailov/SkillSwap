import styles from "./input.module.css";
import search from "../../../shared/icon/assets/search.svg";
import type { ChangeEvent } from "react";
interface InputProps {
  placeholder: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}
export const Input = ({ placeholder, type, onChange, value }: InputProps) => {
  return (
    <div className={styles.wrapSearch}>
      <img src={search} alt="" />
      <input
        type={type}
        className={styles.search}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};
