import { HiOutlineMoon, HiOutlineSun, HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonIcon from "../ui/ButtonIcon";
import Logout from "../features/authentication/Logout";
import { useDarkModeContext } from "../context/darkModeContext";

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  const { isDark, toggleMode } = useDarkModeContext();
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon onClick={toggleMode}>
          {isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
