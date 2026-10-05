import { useState } from "react";
import styles from "./selector.module.css";
import chevronDown from "../../../shared/icon/assets/chevron-down.svg";
import chevronUp from "../../../shared/icon/assets/chevron-up.svg";
interface CommonInputProps {
  placeHolder: string;
  label: string;
  options: Option[];
  error?: boolean;
  textError: string;
  selectorCategories?: string[];
}
type InputProps = CommonInputProps &
  (
    | {
        multiPlay: true;
        value: string[];
        onChange: (value: string[]) => void;
      }
    | {
        multiPlay?: false;
        value: string;
        onChange: (value: string) => void;
      }
  );
export interface Option {
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
  multiPlay,
  selectorCategories,
  onChange,
}: InputProps) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(value);
  return (
    <div className={styles.wraps}>
      <label htmlFor="gender" className={styles.label}>
        {label}
      </label>
      {multiPlay ? (
        <div className={styles.field}>
          <button
            type="button"
            className={`${styles.selected} ${styles.multipleSelected}`}
            onClick={() => setIsOpen((open) => !open)}
          >
            {Array.isArray(selectorCategories) && selectorCategories.length > 0
              ? selectorCategories.join(", ")
              : placeHolder}
            <span aria-hidden className={styles.rightIcon}>
              <img src={isOpen ? chevronUp : chevronDown} alt="" />
            </span>
          </button>
          {isOpen && (
            <div className={styles.multipleOptions}>
              {options.map((option) => {
                const selectedValues = Array.isArray(value) ? value : [];
                const isSelected = selectedValues.includes(option.value);

                return (
                  <label className={styles.multipleOption} key={option.value}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {
                        const nextValue = isSelected
                          ? selectedValues.filter(
                              (selectedValue) => selectedValue !== option.value,
                            )
                          : [...selectedValues, option.value];
                        onChange(nextValue);
                      }}
                    />
                    {option.label || option.name}
                  </label>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className={styles.field} onClick={() => setIsOpen(!isOpen)}>
            <select
              onChange={(event) => onChange(event.target.value)}
              id="gender"
              className={styles.selected}
            >
              {<option value={placeHolder}>{placeHolder}</option>}
              {options.map((el) => (
                <option value={el.value}>{el.label}</option>
              ))}
            </select>
            <span aria-hidden className={styles.rightIcon}>
              <img src={isOpen ? chevronUp : chevronDown} alt="" />
            </span>
          </div>
          {error && <p className={styles.error}>{textError}</p>}
        </>
      )}
    </div>
  );
}
