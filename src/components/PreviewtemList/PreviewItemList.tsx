import * as S from "./PreviewItemList.styled";
import { useAppSelector } from "../../redux/hooks";
import { selectDescription, selectQuestionList, selectTitle } from "../../redux/slice/surveySlice";
import PreviewItem from "../PreviewItem/PreviewItem";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

function PreviewItemList() {
  const title = useAppSelector(selectTitle);
  const description = useAppSelector(selectDescription);
  const questions = useAppSelector(selectQuestionList);

  const hasRequiredQuestion = questions.some((question) => question.isRequired);

  const { register, handleSubmit, formState } = useForm();

  const onSubmit = (data: unknown) => console.log(data);

  return (
    <S.Container>
      <S.SurveyTitleContainer>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        {hasRequiredQuestion && <S.Guide>* 표시는 필수 질문임</S.Guide>}
      </S.SurveyTitleContainer>
      <S.SurveyForm onSubmit={handleSubmit(onSubmit)}>
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
