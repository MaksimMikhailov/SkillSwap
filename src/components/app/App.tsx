import { Route, Routes } from "react-router-dom";
import "./styles/global.css";
import { routes } from "../../shared/lib/constants";
import { AuthPage } from "../../pages/authPage";
import { FavoritePage } from "../../pages/favoritePage";
import { MainPage } from "../../pages/mainPage";
import { RegisterPage } from "../../pages/registerPage";

import { NotFoundPage } from "../../pages/notFoundPage";
import { Container } from "../ui/container";
import { useDispatch, useSelector } from "react-redux";

import { ProtectedRoute } from "../protectedRoute";
import type { AppDispatch, RootState } from "../../services/store";
import { SkillPage } from "../../pages/profilePage";
import { getSkills } from "../../services/store/slice/skillsSlice";
import {
  getCategory,
  getUsers,
  getСity,
} from "../../services/store/slice/userSlice";
import { useEffect } from "react";
import { actionGetAuth } from "../../services/store/slice/authSlice";
import { ProfilePage } from "../../pages/skillPage";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getSkills());
    dispatch(getUsers());
    dispatch(getСity());
    dispatch(getCategory());
    dispatch(actionGetAuth());
  }, [dispatch]);
  const isAuth = useSelector((state: RootState) => state.auth.IsAuth);
  return (
    <>
      <Routes>
        <Route element={<Container />}>
          <Route element={<ProtectedRoute isAuth={isAuth} />}>
            <Route path={routes.favorite} element={<FavoritePage />} />
            <Route path={routes.profile} element={<ProfilePage />} />
          </Route>
          <Route path={routes.main} element={<MainPage />} />
          <Route path={routes.skill} element={<SkillPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route element={<ProtectedRoute isAuth={isAuth} onlyOnAuth />}>
          <Route path={routes.register} element={<RegisterPage />} />
          <Route path={routes.auth} element={<AuthPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
