import { createContext, useContext, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext();

function Menus({ children, id }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currMenuId, setCurrMenuId] = useState("");
  const open = setMenuOpen;
  const close = () => setMenuOpen(false);
  return (
    <MenuContext.Provider
      value={{ menuOpen, open, close, currMenuId, id, setCurrMenuId }}
    >
      <Menu>{children}</Menu>
    </MenuContext.Provider>
  );
}

function Toggle() {
  const { open, setCurrMenuId, id } = useContext(MenuContext);

  function handleClick() {
    open((isOpen) => !isOpen);
    setCurrMenuId(id);
  }

  return (
    <StyledToggle onClick={() => handleClick()}>
      <HiDotsHorizontal />
    </StyledToggle>
  );
}

function MenuList({ children, id }) {
  const { menuOpen, currMenuId } = useContext(MenuContext);
  const condition = menuOpen && currMenuId === id;
  return (
    condition && <StyledList position={{ x: 20, y: 20 }}>{children}</StyledList>
  );
}

function MenuItem({ children }) {
  return (
    <li>
      <StyledButton>{children}</StyledButton>;
    </li>
  );
}

Menus.Toggle = Toggle;
Menus.List = MenuList;
Menus.Item = MenuItem;

export default Menus;
