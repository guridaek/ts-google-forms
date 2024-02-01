import styled from "styled-components";

export const Container = styled.li`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
  border: 1px solid lightgray;
  border-radius: 8px;
  padding: 0 20px 10px 20px;
  box-sizing: border-box;

  background-color: white;

  &:focus-within {
    border-left: 7px solid skyblue;
    padding-left: 14px;
  }
`;

export const QuestionInput = styled.input`
  border: none;
  border-bottom: 1px solid lightgray;

  font-size: 24px;
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
`;

export const DraggableIcon = styled.img`
  width: 20px;

  margin-left: auto;
  margin-right: auto;

  cursor: move;
`;

export const TypeSelect = styled.select`
  width: 140px;
  height: 40px;
`;

export const TypeOption = styled.option``;

export const Answer = styled.div`
  width: 70%;

  border-bottom: 1px dotted black;
  padding-bottom: 8px;

  color: gray;
`;

export const BottomIcons = styled.div`
  display: flex;
  gap: 20px;
  margin-left: auto;
  padding: 0 20px;

  border-right: 1px solid lightgray;
`;

export const Icon = styled.img`
  cursor: pointer;
`;

export const ToggleButton = styled.input``;
