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
export interface Notifications {
  date: string;
  userId: string;
  type: boolean;
  text: string;
  status: "pending" | "reject" | "fulfilled";
}
