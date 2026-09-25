import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  name: string;
  avatarUrl: string;
  age: number;
  cityId: string;
  gender: string;
  email: string;
  password: string;
  birthDate: Date;
  about: string;
  favoriteSkillIds: string[];
  learnCategoryIds: string[];
  learnSubcategoryIds: string[];
  createdAt: Date;
}
interface ISubCategory {
  id: string;
  name: string;
}
export interface ICity {
  id: string;
  name: string;
}
export interface ICategory {
  id: string;
  name: string;
  icon: string;
  subcategories: ISubCategory[];
}
interface InitialState {
  user: IUser[];
  city: ICity[];
  category: ICategory[];
  loading: boolean;

  error: string;
}
const initialState: InitialState = {
  user: [],
  city: [],
  category: [],
  loading: false,
  error: "",
};
export const getUsers = createAsyncThunk("user/getUsers", async () => {
  const res = await fetch("../../../../public/db/users.json");
  return await res.json();
});
export const getСity = createAsyncThunk("user/getСity", async () => {
  const res = await fetch("../../../../public/db/cities.json");
  return await res.json();
});
export const getCategory = createAsyncThunk("user/getCategory", async () => {
  const res = await fetch("../../../../public/db/categories.json");
  return await res.json();
});
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Не удалось загрузить пользователя. Попробуйте позже";
      })
      .addCase(getСity.fulfilled, (state, action) => {
        state.city = action.payload;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.category = action.payload;
      });
  },
});
export default userSlice.reducer;
