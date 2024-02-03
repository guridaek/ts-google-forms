import styled from "styled-components";
import * as QuestionItem from "../QuestionItem/QuestionItem.styled";
import { TextField } from "@mui/material";

export const Container = styled.ul`
  display: flex;
  flex-direction: column;

  width: 100%;

  gap: 20px;
`;

export const SurveyTitleContainer = styled(QuestionItem.Container)`
  border-top: 10px solid #673ab7;
  padding-top: 20px;
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
