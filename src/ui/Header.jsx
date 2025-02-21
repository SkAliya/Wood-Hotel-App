import styled from "styled-components";

const HeaderEle = styled.header`
  /* grid-area: 1/1/2/-1; */
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header() {
  return <HeaderEle>im header</HeaderEle>;
}

export default Header;
