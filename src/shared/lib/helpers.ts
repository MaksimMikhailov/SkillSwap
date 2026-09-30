import type { ICategory } from "../../services/store/slice/userSlice";

export function getCategoryOption(category: ICategory[]) {
  return category.map((el) => ({
    value: el.id,
    label: el.name,
  }));
}
export function getSubCategoryOption(category: ICategory[]) {
  return category
    .flatMap((el) => el.subcategories)
    .map((el) => ({
      value: el.id,
      label: el.name,
    }));
}
