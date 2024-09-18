/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useDetectClick from "../hooks/useDetectClick";
const Menu = styled.div`
  position: relative;
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
  position: absolute;
  z-index: 1;

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

const StyledLabel = styled.span`
  width: max-content;
`;
const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const openMenu = (id) => setOpenId(id);
  const closeMenu = () => setOpenId(null);
  return (
    <MenusContext.Provider
      value={{ openId, openMenu, closeMenu, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, openMenu, closeMenu, setPosition } = useContext(MenusContext);
  function handleClick(e) {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: -8,
      y: rect.height,
    });

    openId ? (openId === id ? closeMenu() : openMenu(id)) : openMenu(id);
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ id, children }) {
  const { openId, position, closeMenu } = useContext(MenusContext);
  const ref = useDetectClick(closeMenu, false);
  if (openId !== id) return null;

  return (
    <StyledList ref={ref} position={{ x: position.x, y: position.y }}>
      {children}
    </StyledList>
  );
}
function Button({ icon, children, onClick, disabled }) {
  const { closeMenu } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    closeMenu();
  }
  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon} <StyledLabel>{children}</StyledLabel>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
