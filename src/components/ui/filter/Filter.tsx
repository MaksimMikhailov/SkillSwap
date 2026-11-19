import { useSelector } from "react-redux";
import styles from "./filter.module.css";
import type { RootState } from "../../../services/store";
import chevronDown from "../../../shared/icon/assets/chevron-down.svg";
import { useState } from "react";
interface PropsFilters {
  onChange: (value: FiltersChangeMod) => void;
  filters: FiltersChangeMod;
}
export interface FiltersChangeMod {
  skillType: string;
  categoryIds: string[];
  gender: string;
  cityIds: string[];
}
export function Filter({ onChange, filters }: PropsFilters) {
  console.log(filters);
  const category = useSelector((state: RootState) => state.user.category);
  const visibleCategories = 3;
  const [visibleCount, setVisibleCount] = useState(visibleCategories);
  console.log(category);
  return (
    <aside>
      <form className={styles.form}>
        <h1 className={styles.titlesFilters}>Фильтры</h1>
        <div className={`${styles.radio} ${styles.active} `}>
          {[
            {
              value: "Всё",
              id: "all",
            },
            { value: "Хочу научиться", id: "learn" },
            { value: "Могу научить", id: "teach" },
          ].map((el) => (
            <label
              htmlFor={el.id}
              key={el.id}
              className={filters.skillType === el.id ? styles.activeRadio : ""}
            >
              <input
                type="radio"
                value={el.value}
                id={el.id}
                name="skills"
                onChange={() => {
                  onChange({ ...filters, skillType: el.id });
                }}
              />
              {el.value}
            </label>
          ))}
        </div>
        <div className={styles.checkbox}>
          <h2 className={styles.titles}>Навыки</h2>
          {category.slice(0, visibleCount).map((el) => (
            <label
              htmlFor={el.id}
              key={el.id}
              className={filters.skillType === el.id ? styles.activeRadio : ""}
            >
              <input
                type="radio"
                value={el.name}
                id={el.id}
                name="skills"
                onChange={() => {
                  onChange({ ...filters, skillType: el.id });
                }}
              />
              {el.name}
            </label>
          ))}
          <button
            className={styles.moreCategory}
            onClick={() => {
              if (visibleCount === 3) setVisibleCount(category.length);
              else setVisibleCount(3);
            }}
          >
            Все категории <img src={chevronDown} alt="" />
          </button>
        </div>
        <div className={styles.gender}>
          <h3 className={styles.titles}>Пол автора</h3>
          {[
            {
              value: "Не имеет значения",
              id: "none",
            },
            { value: "Мужской", id: "man" },
            { value: "Женский", id: "girl" },
          ].map((el) => (
            <label
              htmlFor={el.id}
              key={el.id}
              className={filters.gender === el.id ? styles.activeRadio : ""}
            >
              <input
                type="radio"
                value={el.value}
                id={el.id}
                name="gender"
                onChange={() => {
                  onChange({ ...filters, gender: el.id });
                }}
              />
              {el.value}
            </label>
          ))}
        </div>
        <div className={styles.city}>
          <h3 className={styles.titles}>Город</h3>
          <label htmlFor="house">
            <input type="checkbox" value="Москва" id="house" />
            Москва
          </label>
        </div>
      </form>
    </aside>
  );
}
