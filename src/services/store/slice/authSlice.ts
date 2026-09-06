import { createSlice } from "@reduxjs/toolkit";

interface IAuth {
  name: string;
  surname: string;
  token: string;
  image: string;
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
    setAuth(state, action) {
      state.auth = action.payload;
      localStorage.setItem("auth", JSON.stringify(action.payload));
    },
    getAuth(state) {
      state.auth = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth")!)
        : null;
    },
  },
});
export default authSlice.reducer;
export const { setAuth, getAuth } = authSlice.actions;
