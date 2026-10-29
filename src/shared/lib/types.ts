export type Skills =
  | "Английский язык"
  | "Тайм менеджмент"
  | "Медитация"
  | "Бизнес-план"
  | "Игра на барабанах"
  | "Реставрация мебели";
export interface User {
  login: string;
  password: string;
  name: string;
  image: string;
}
