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
  const { category, city } = useSelector((state: RootState) => state.user);

  const [visibleCount, setVisibleCount] = useState({
    categories: 3,
    city: 5,
  });
  const [switchBtn, setSwitchBtn] = useState({
    categories: false,
    city: false,
  });

  console.log(filters);
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
          {category.slice(0, visibleCount.categories).map((el) => (
            <label
              htmlFor={el.id}
              key={el.id}
              className={
                filters.categoryIds.includes(el.id) ? styles.activeCheckBox : ""
              }
            >
              <input
                type="radio"
                value={el.name}
                id={el.id}
                name="skills"
                onChange={() => {
                  let result;
                  if (filters.categoryIds.includes(el.id)) {
                    result = filters.categoryIds.filter((id) => id !== el.id);
                  } else {
                    result = [...filters.categoryIds];
                    result.push(el.id);
                  }
                  onChange({ ...filters, categoryIds: result });
                }}
              />
              {el.name}
            </label>
          ))}
          <button
            className={`${styles.moreCategory} ${switchBtn.categories ? styles.active : ""}`}
            onClick={(e) => {
              e.preventDefault();
              if (visibleCount.categories === 3)
                setVisibleCount({
                  ...visibleCount,
                  categories: category.length,
                });
              else
                setVisibleCount({
                  ...visibleCount,
                  categories: 3,
                });
              setSwitchBtn({ ...switchBtn, categories: !switchBtn.categories });
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
          {city.slice(0, visibleCount.city).map((el) => (
            <>
              <label
                htmlFor={el.id}
                key={el.id}
                className={
                  filters.cityIds.includes(el.id) ? styles.activeCheckBox : ""
                }
                onChange={() => {
                  let result;
                  if (filters.cityIds.includes(el.id)) {
                    result = filters.cityIds.filter((id) => id !== el.id);
                  } else {
                    result = [...filters.cityIds];
                    result.push(el.id);
                  }
                  onChange({ ...filters, cityIds: result });
                }}
              >
                <input type="checkbox" value={el.name} id={el.id} />
                {el.name}
              </label>
            </>
          ))}
          <button
            className={`${styles.moreCategory} ${switchBtn.city ? styles.active : ""}`}
            onClick={(e) => {
              e.preventDefault();
              if (visibleCount.city === 5)
                setVisibleCount({
                  ...visibleCount,
                  city: city.length,
                });
              else
                setVisibleCount({
                  ...visibleCount,
                  city: 5,
                });
              setSwitchBtn({
                ...switchBtn,
                city: !switchBtn.city,
              });
            }}
          >
            Все города <img src={chevronDown} alt="" />
          </button>
        </div>
      </form>
    </aside>
  );
}
