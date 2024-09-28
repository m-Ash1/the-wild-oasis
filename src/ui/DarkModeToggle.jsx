import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useDarkMode } from "../contexts/DarkmodeContext";
import ButtonIcon from "./ButtonIcon";
function DarkModeToggle() {
  const { isDarkMode, toggleMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
