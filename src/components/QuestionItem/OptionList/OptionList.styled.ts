import styled from "styled-components";

export const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
`;

export const Option = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const OptionButton = styled.input``;

export const OptionInput = styled.input`
  width: 80%;

  border: none;

  font-size: 16px;
`;

export const removeButton = styled.button`
  margin-left: auto;

  border: none;

  background: transparent;
  font-size: 18px;

  cursor: pointer;
`;

export const addButton = styled.button`
  border: none;

  background: transparent;
  font-size: 15px;
  color: #1a73e8;

  cursor: pointer;
`;
