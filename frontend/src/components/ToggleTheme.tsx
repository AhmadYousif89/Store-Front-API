import * as FaIcons from "react-icons/fa";
import { ThemeContext } from "../App";
import { useContext } from "react";
import "./styles/ToggleTheme.css";

function ToggleTheme() {
  const appTheme = useContext(ThemeContext);

  return (
    <span className="store-theme">
      <input
        type="checkbox"
        name="appTheme"
        id="checkbox"
        onChange={() => appTheme?.toggleTheme()}
      />
      <label htmlFor="checkbox" className="label">
        <FaIcons.FaMoon className="moon" />
        <FaIcons.FaSun className="sun" />
        <div className="ball" />
      </label>
    </span>
  );
}

export default ToggleTheme;
