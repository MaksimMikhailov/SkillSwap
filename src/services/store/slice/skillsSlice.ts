import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ISkills {
  id: string;
  title: string;
  description: string;
  type: string;
  categoryId: string;
  subcategoryId: string;
  tags: string[];
  imageUrl: string;
  images: string[];
  authorId: string;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
}
interface InitialState {
  skills: ISkills[];
  loading: boolean;
  error: string;
}
const initialState: InitialState = {
  skills: [],
  loading: false,
  error: "",
};
export const getSkills = createAsyncThunk("skills/getSkills", async () => {
  const res = await fetch("../../../../public/db/skills.json");
  return await res.json();
});
const skillsSlice = createSlice({
  name: "skilss",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(getSkills.rejected, (state) => {
        state.loading = false;
        state.error = "Не удалось загрузить навыки. Попробуйте позже";
      });
  },
});
export default skillsSlice.reducer;
