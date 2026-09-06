import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./slice/authSlice";
import skills from "./slice/skillsSlice";
import user from "./slice/userSlice";

const reducer = combineReducers({ auth, skills, user });
export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
