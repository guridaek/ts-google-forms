import styled from "styled-components";
import { TextField } from "@mui/material";

export const Container = styled.ul`
  display: flex;
  flex-direction: column;

  width: 100%;

  gap: 20px;
`;

export const SurveyTitleContainer = styled.li`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
  border: 1px solid lightgray;
  border-top: 10px solid #673ab7;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;

  background-color: white;

  &:focus-within {
    border-left: 7px solid skyblue;
    padding-left: 14px;
    box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.2);
  }
`;

export const SurveyListContainer = styled.ul`
  display: flex;
  flex-direction: column;

  width: 100%;

  gap: 20px;
`;

export const titleInput = styled(TextField)`
  ::before {
    border-bottom: none !important;
  }

  div {
    font-size: 38px;
  }
`;

export const descriptionInput = styled(TextField)`
  ::before {
    border-bottom: none !important;
  }

  div {
    font-size: 18px;
  }
`;
