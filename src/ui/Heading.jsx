import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 2.4rem;
    `};
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
    `};
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.8rem;
    `};
  font-weight: 600;
  /* background-color: yellow; */
`;

export default Heading;
