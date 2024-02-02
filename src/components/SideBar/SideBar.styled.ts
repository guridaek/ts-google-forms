import styled from "styled-components";

export const Container = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: sticky;
  top: 10px;
  width: 50px;
  height: 200px;

  box-sizing: border-box;
  border-radius: 6px;
  border: 1px solid lightgray;
  padding: 8px;

  background-color: white;
`;

export const Icon = styled.img`
  cursor: pointer;
`;
