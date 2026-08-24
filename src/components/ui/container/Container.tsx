import { Outlet } from "react-router-dom";
import styles from "./container.module.css";
import { AppFooter } from "../app-footer";
import { AppHeader } from "../app-header";
export function Container() {
  return (
    <div className={styles.container}>
      <AppHeader />
      <main>
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}
