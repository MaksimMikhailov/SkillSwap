import type { ReactNode } from "react";
import styles from "./registrationLayout.module.css";
interface RegistrationLayoutProps {
  stepCurrent: Steps;
  leftContent: ReactNode;
  rightContent: ReactNode;
}
export type Steps = 1 | 2 | 3;
export function RegistrationLayout({
  stepCurrent,
  leftContent,
  rightContent,
}: RegistrationLayoutProps) {
  const steps = [1, 2, 3];
  return (
    <div className={styles.global}>
      <h1 className={styles.h1}>Шаг {stepCurrent} из 3</h1>
      <div className={styles.wrapsLine}>
        {steps.map((el) => (
          <div
            className={`${styles.lines} ${el <= stepCurrent ? styles.green : ""}`}
          ></div>
        ))}
      </div>
      <main className={styles.cards}>
        <section className={styles.card}>{leftContent}</section>
        <section className={styles.card}>{rightContent}</section>
      </main>
    </div>
  );
}
