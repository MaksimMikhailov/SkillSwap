import type { ISkills } from "../../services/store/slice/skillsSlice";
import { Card } from "../ui/card";
import type { CardProps } from "../ui/card/Card";
import styles from "./cards.module.css";
interface CardsProps {
  listCards: CardProps[];
}
export function Cards({ listCards }: CardsProps) {
  return listCards.map((el) => <Card {...el} isHeartDisplay />);
}
