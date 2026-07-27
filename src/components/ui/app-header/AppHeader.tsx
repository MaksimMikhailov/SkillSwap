import { NavLink } from "react-router-dom";
import { HeaderLogo } from "../../../shared/icon";

export function AppHeader() {
  return (
    <header>
      <img src="./HeaderLogo.svg" alt="" />
      <nav>
        <NavLink to="/">О проекте</NavLink>
        <div>
          <NavLink to="/">Все навыки</NavLink>
          <img src=""></img>
        </div>
      </nav>
      <input type="search" id="" placeholder="Искать навык" />
      <NavLink to="/">
        <img src="" alt="" />
      </NavLink>
    </header>
  );
}
