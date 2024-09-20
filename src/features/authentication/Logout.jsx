import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import useLogOut from "./useLogOut";

function Logout() {
  const { logOutMutator, isLoggingOut } = useLogOut();
  return (
    <ButtonIcon onClick={() => logOutMutator()}>
      {!isLoggingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
