import { TextField } from "@mui/material";
import styled from "styled-components";

export const Container = styled.li<{ $isError: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
  border: ${({ $isError }) => ($isError ? "1px solid #d93025" : "1px solid lightgray")};
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;

  background-color: white;
`;

export const title = styled.h2`
  font-size: 16px;
`;

export const ShortTextInput = styled(TextField)`
  width: 50%;
`;

export const LongTextInput = styled(TextField)`
  width: 80%;
`;

export const RequiredMark = styled.span`
  color: #d93025;
`;

export const DropdownContainer = styled.div`
  min-width: 200px;
`;

export const ErrorMessage = styled.p`
  color: #d93025;
`;
