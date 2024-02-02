import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectDescription,
  selectQuestionList,
  selectTitle,
  setDescription,
  setTitle,
} from "../../redux/slice/surveySlice";
import QuestionItem from "../QuestionItem/QuestionItem";
import * as S from "./QuestionItemList.styled";

function QuestionItemList() {
  const dispatch = useAppDispatch();

  const title = useAppSelector(selectTitle);
  const description = useAppSelector(selectDescription);
  const questions = useAppSelector(selectQuestionList);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setDescription(e.target.value));
  };

  return (
    <S.Container>
      <S.SurveyTitleContainer>
        <S.titleInput
          type="text"
          value={title}
          placeholder="설문지 제목"
          onChange={handleTitleChange}
        />
        <S.descriptionInput
          type="text"
          value={description}
          placeholder="설문지 설명"
          onChange={handleDescriptionChange}
        />
      </S.SurveyTitleContainer>
      {questions.map((question) => (
        <QuestionItem key={question.id} questionId={question.id} />
      ))}
    </S.Container>
  );
}

export default QuestionItemList;
