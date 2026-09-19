import { Route, Routes } from "react-router-dom";
import { AppHeader } from "../ui/app-header";
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

function App() {
  // const isAuth = useSelector((store: RootState) => store.auth.IsAuth);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getSkills());
    dispatch(getUsers());
    dispatch(getСity());
    dispatch(getCategory());
  }, [dispatch]);
  const isAuth = true;
  return (
    <>
      <Routes>
        <Route element={<Container />}>
          <Route element={<ProtectedRoute isAuth={isAuth} />}>
            <Route path={routes.skill} element={<SkillPage />} />
            <Route path={routes.favorite} element={<FavoritePage />} />
          </Route>
          <Route element={<ProtectedRoute isAuth={isAuth} onlyOnAuth />}>
            <Route path={routes.auth} element={<AuthPage />} />
          </Route>
          <Route path={routes.main} element={<MainPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path={routes.register} element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
