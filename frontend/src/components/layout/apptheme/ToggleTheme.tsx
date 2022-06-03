import { toggleTheme } from "../../../redux/features/themes/themeSlice";
import { useDispatch } from "react-redux";
import * as FaIcons from "react-icons/fa";
import "./styles/toggleTheme.css";

function ToggleTheme() {
  const dispatch = useDispatch();

  return (
    <span className="store-theme">
      <input
        type="checkbox"
        name="appTheme"
        id="checkbox"
        onChange={() => dispatch(toggleTheme())}
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
