import styles from "./input.module.css";
interface InputProps {
  type: "text" | "password" | "email";
  placeHolder: string;
  label: string;
  value: string;
  error?: boolean;
  textError: string;
  rightIcon?: string;
  setStateIcon?: () => void;
  onchange: (value: string) => void;
}
export function Input({
  type,
  placeHolder,
  label,
  value,
  error,
  textError,
  rightIcon,
  setStateIcon,
  onchange,
}: InputProps) {
  return (
    <div className={styles.wrap}>
      <label htmlFor={type} className={styles.label}>
        {label}
      </label>
      <div className={styles.field}>
        <input
          type={type}
          placeholder={placeHolder}
          className={styles.input}
          value={value}
          id={type}
          onChange={(event) => {
            onchange(event.target.value);
          }}
        />
        {rightIcon && (
          <span aria-hidden className={styles.rightIcon} onClick={setStateIcon}>
            <img src={rightIcon} alt="" />
          </span>
        )}
      </div>

      {error && <p className={styles.error}>{textError}</p>}
    </div>
  );
}
