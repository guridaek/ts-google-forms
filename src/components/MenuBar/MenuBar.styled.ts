import { Fab } from "@mui/material";
import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  width: 100vw;
  height: 8vh;

  padding-right: 40vw;

  background-color: white;

  cursor: pointer;
`;

export const Button = styled(Fab)`
  background-color: white !important;
  box-shadow: none !important;

  &:hover {
    background-color: #f0f0f0 !important;
  }
`;

export const Icon = styled.img``;
