import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import styled from "styled-components";
import useCloseModel from "../hooks/useCloseModel";

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
  z-index: 100;
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

function Menus({ children }) {
  const [currMenuId, setCurrMenuId] = useState("");
  const [position, setPosition] = useState({});

  const open = setCurrMenuId;
  const close = () => setCurrMenuId("");
  return (
    <MenuContext.Provider
      value={{
        currMenuId,
        setCurrMenuId,
        position,
        setPosition,
        open,
        close,
      }}
    >
      {/* <Menu>{children}</Menu> */}
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({ id }) {
  const { open, currMenuId, close, setPosition } = useContext(MenuContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.x - rect.width,
      y: rect.y + rect.height + 8,
    });
    if (currMenuId === "" || currMenuId !== id) {
      open(id);
    } else {
      close();
    }
  }
  return (
    <StyledToggle onClick={(e) => handleClick(e)}>
      <HiDotsHorizontal />
    </StyledToggle>
  );
}

function MenuList({ children, id }) {
  const { currMenuId, position, close } = useContext(MenuContext);

  const ref = useCloseModel(close, false);

  if (currMenuId !== id) {
    // close();
    return null;
  }

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function MenuItem({ children, icon, onClick }) {
  return (
    <li>
      <StyledButton onClick={() => onClick()}>
        {icon}
        {children}
      </StyledButton>
    </li>
  );
}

Menus.Toggle = Toggle;
Menus.List = MenuList;
Menus.Item = MenuItem;

export default Menus;
