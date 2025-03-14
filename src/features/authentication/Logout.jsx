import { HiMiniArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { isLoading, logoutMutateFn } = useLogout();
  return (
    <ButtonIcon disabled={isLoading} onClick={logoutMutateFn}>
      {!isLoading ? <HiMiniArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
