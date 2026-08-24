import { Route, Routes } from "react-router-dom";
import { AppHeader } from "../ui/app-header";
import "./styles/global.css";
import { routes } from "../../shared/lib/constants";
import { AuthPage } from "../../pages/authPage";
import { FavoritePage } from "../../pages/favoritePage";
import { MainPage } from "../../pages/mainPage";
import { ProfilePage } from "../../pages/profilePage";
import { RegisterPage } from "../../pages/registerPage";
import { SkillPage } from "../../pages/skillPage";
import { NotFoundPage } from "../../pages/notFoundPage";
import { AppFooter } from "../ui/app-footer";
import { Container } from "../ui/container";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Container />}>
          <Route path={routes.auth} element={<AuthPage />} />
          <Route path={routes.favorite} element={<FavoritePage />} />
          <Route path={routes.main} element={<MainPage />} />
          <Route path={routes.profile} element={<ProfilePage />} />

          <Route path={routes.skill} element={<SkillPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path={routes.register} element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
