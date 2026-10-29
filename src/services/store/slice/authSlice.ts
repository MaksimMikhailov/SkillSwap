import { createSlice } from "@reduxjs/toolkit";

export interface IAuth {
  login: string;
  name: string;
  password: string;
  image: string;
  date: string;
  gender: string;
  city: string;
  description: string;
}
interface InitialState {
  auth: IAuth | null;
  IsAuth: boolean;
}
const initialState: InitialState = {
  auth: null,
  IsAuth: false,
};

const authSlice = createSlice({
  name: "skilss",
  initialState,
  reducers: {
    actionSetAuth(state, action) {
      state.auth = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.IsAuth = true;
    },
    actionGetAuth(state) {
      state.auth = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")!)
        : null;
      if (state.auth) state.IsAuth = true;
    },
  },
});
export default authSlice.reducer;
export const { actionSetAuth, actionGetAuth } = authSlice.actions;
