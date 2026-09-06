import { useState } from "react";
import styles from "./filter.module.css";

export function Filter() {
  return (
    <aside>
      <form className={styles.form}>
        <h1 className={styles.titlesFilters}>Фильтры</h1>
        <div className={`${styles.radio} ${styles.active}`}>
          <label htmlFor="all">
            <input type="radio" value="Всё" id="all" name="skills" />
            Всё
          </label>

          <label className={styles.active} htmlFor="learn">
            <input
              type="radio"
              value="Хочу научиться"
              id="learn"
              name="skills"
            />
            Хочу научиться
          </label>
          <label htmlFor="teach">
            <input type="radio" value="Могу научить" id="teach" name="skills" />
            Могу научить
          </label>
        </div>
        <div className={styles.checkbox}>
          <h2 className={styles.titles}>Навыки</h2>
          <label htmlFor="deal">
            <input type="checkbox" value="Бизнес и карьера" id="deal" />
            Бизнес и карьера
          </label>

          <label htmlFor="creation">
            <input
              type="checkbox"
              value="Творчество и искусство"
              id="creation"
            />
            Творчество и искусство
          </label>
          <label htmlFor="english">
            <input type="checkbox" value="Иностранные языки" id="english" />
            Иностранные языки
          </label>

          <label htmlFor="learing">
            <input
              type="checkbox"
              value="Образование и развитие"
              id="learing"
            />
            Образование и развитие
          </label>

          <label htmlFor="heart">
            <input type="checkbox" value="Здоровье и лайфстайл" id="heart" />
            Здоровье и лайфстайл
          </label>

          <label htmlFor="house">
            <input type="checkbox" value="Дом и уют" id="house" />
            Дом и уют
          </label>
        </div>
        <div className={styles.gender}>
          <h3 className={styles.titles}>Пол автора</h3>
          <label htmlFor="donthave">
            <input type="radio" value="Всё" id="donthave" name="gender" />
            Не имеет значения
          </label>

          <label htmlFor="man">
            <input type="radio" value="Хочу научиться" id="man" name="gender" />
            Мужской
          </label>
          <label htmlFor="girl">
            <input type="radio" value="Могу научить" id="girl" name="gender" />
            Женский
          </label>
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
