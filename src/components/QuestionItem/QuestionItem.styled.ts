import { MenuItem, Select, TextField } from "@mui/material";
import styled from "styled-components";

export const Container = styled.li`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
  border: 1px solid lightgray;
  border-radius: 8px;
  padding: 0 20px 5px 20px;
  box-sizing: border-box;

  background-color: white;

  &:focus-within {
    border-left: 7px solid skyblue;
    padding-left: 14px;
  }
`;

export const QuestionInput = styled(TextField)`
  div {
    padding-bottom: 12px;
  }
  /* font-size: 24px; */
`;

export const Description = styled.p`
  font-size: 20px;
  color: gray;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  &:last-child {
    border-top: 1px solid lightgray;
  }
`;

export const DraggableIcon = styled.img`
  width: 20px;

  margin-left: auto;
  margin-right: auto;

  cursor: move;
`;

export const TypeSelect = styled(Select)`
  width: 40%;
  height: 80%;
`;

export const TypeOption = styled(MenuItem)``;

export const Answer = styled.div`
  width: 70%;

  border-bottom: 1px dotted black;
  padding-bottom: 8px;

  color: gray;
`;

export const BottomIcons = styled.div`
  display: flex;
  margin-left: auto;
  padding: 10px 10px;
`;

export const Icon = styled.img`
  cursor: pointer;
`;

export const ToggleButton = styled.input``;

export const VerticalBar = styled.div`
  width: 0;
  height: 50%;

  margin-right: 16px;

  border-left: 1px solid lightgray;
`;
