import {
  HiArrowRightStartOnRectangle,
  HiOutlineMoon,
  HiOutlineUser,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-gray-0);
  padding: 1.6rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Icons = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-left: 1.8rem;
  align-items: center;
  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
    transition: all 0.3s;
  }
  a {
    display: flex;
    align-items: center;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
  }
`;
function Header() {
  return (
    <StyledHeader>
      <span>Ash</span>
      <Icons>
        <NavLink to="/account">
          <HiOutlineUser />
        </NavLink>
        <NavLink>
          <HiOutlineMoon />
        </NavLink>
        <NavLink to="/login">
          <HiArrowRightStartOnRectangle />
        </NavLink>
      </Icons>
    </StyledHeader>
  );
}

export default Header;
