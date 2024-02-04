import { TextField } from "@mui/material";
import styled from "styled-components";

export const Container = styled.ul`
  width: 100%;
`;

export const Option = styled.li<{ $isFocused?: boolean }>`
  position: relative;

  width: 100%;
  height: 42px;

  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    img:first-child {
      visibility: ${({ $isFocused }) => $isFocused && "visible"};
    }
  }
`;

export const OptionButton = styled.input``;

export const OptionInput = styled(TextField)`
  ::before {
    border-bottom: none !important;
  }
`;

export const OtherOption = styled.p`
  width: 100%;
  color: gray;
`;

export const addButton = styled.button`
  border: none;

  background: transparent;
  font-size: 15px;
  color: #1a73e8;

  cursor: pointer;
`;

export const DraggableIcon = styled.img`
  visibility: hidden;

  position: absolute;
  left: -18px;

  width: 20px;

  cursor: move;
`;

export const CloseIcon = styled.img`
  width: 24px;
`;

export const DraggableListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;

  width: 100%;
`;
