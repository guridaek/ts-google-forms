import * as S from "./PreviewItemList.styled";
import { useAppSelector } from "../../redux/hooks";
import { selectDescription, selectQuestionList, selectTitle } from "../../redux/slice/surveySlice";
import PreviewItem from "../PreviewItem/PreviewItem";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";

function PreviewItemList() {
  const title = useAppSelector(selectTitle);
  const description = useAppSelector(selectDescription);
  const questions = useAppSelector(selectQuestionList);

  const hasRequiredQuestion = questions.some((question) => question.isRequired);

  const { register, handleSubmit, formState } = useForm();

  const navigate = useNavigate();

  const handleSurveySubmit = (data: FieldValues) => {
    navigate("/result", {
      state: {
        answers: data,
      },
    });
  };

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (confirm("양식을 지우시겠습니까?")) {
      window.location.reload();
    }
  };

  return (
    <S.Container>
      <S.SurveyTitleContainer>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        {hasRequiredQuestion && <S.Guide>* 표시는 필수 질문임</S.Guide>}
      </S.SurveyTitleContainer>
      <S.SurveyForm onSubmit={handleSubmit(handleSurveySubmit)} onReset={handleReset}>
        {questions.map((question) => (
          <PreviewItem
            key={question.id}
            questionId={question.id}
            register={register}
            formState={formState}
          />
        ))}
        <S.SubmitContainer>
          <Button type="submit" variant="contained">
            제출
          </Button>
          <Button type="reset">양식 지우기</Button>
        </S.SubmitContainer>
      </S.SurveyForm>
    </S.Container>
  );
}

export default PreviewItemList;
