import { useState } from "react";
import styles from "./selector.module.css";
import chevronDown from "../../../shared/icon/assets/chevron-down.svg";
import chevronUp from "../../../shared/icon/assets/chevron-up.svg";
interface InputProps {
  placeHolder: string;
  label: string;
  value: string;
  options: Option[];
  error?: boolean;
  textError: string;

  setStateIcon?: () => void;
}
interface Option {
  label: string;
  value: string;
}
export function Selector({
  placeHolder,
  label,
  value,
  options,
  error,
  textError,

  setStateIcon,
}: InputProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.wraps}>
      <label htmlFor="gender" className={styles.label}>
        {label}
      </label>
      <div className={styles.field} onClick={() => setIsOpen(!isOpen)}>
        <select id="gender" className={styles.selected}>
          {value && <option value={placeHolder}>{placeHolder}</option>}
          {options.map((el) => (
            <option value={el.value}>{el.label}</option>
          ))}
        </select>
        <span aria-hidden className={styles.rightIcon}>
          <img src={isOpen ? chevronUp : chevronDown} alt="" />
        </span>
      </div>
      {error && <p className={styles.error}>{textError}</p>}
    </div>
  );
}
