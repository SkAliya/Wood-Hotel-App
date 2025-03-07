import styled from "styled-components";
import { useDarkModeContext } from "../context/darkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDark } = useDarkModeContext();
  return (
    <StyledLogo>
      <Img src={isDark ? "/logo-dark.png" : "/logo-light.png"} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
