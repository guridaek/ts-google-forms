import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  gap: 20px;
`;

export const SurveyTitleContainer = styled.div`
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
`;

export const Title = styled.h2`
  font-size: 32px;
`;

export const Description = styled.p`
  font-size: 15px;
`;

export const Guide = styled.p`
  color: #d93025;
`;

export const SurveyForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
`;

export const SubmitContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
