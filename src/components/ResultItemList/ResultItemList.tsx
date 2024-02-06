import * as S from "./ResultItemList.styled";
import { useAppSelector } from "../../redux/hooks";
import { selectDescription, selectQuestionList, selectTitle } from "../../redux/slice/surveySlice";
import { FieldValues } from "react-hook-form";
import ResultItem from "../ResultItem/ResultItem";

interface Props {
  answers: FieldValues;
}

function ResultItemList({ answers }: Props) {
  const title = useAppSelector(selectTitle);
  const description = useAppSelector(selectDescription);
  const questions = useAppSelector(selectQuestionList);

  const hasRequiredQuestion = questions.some((question) => question.isRequired);

  return (
    <S.Container>
      <S.SurveyTitleContainer>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        {hasRequiredQuestion && <S.Guide>* 표시는 필수 질문임</S.Guide>}
      </S.SurveyTitleContainer>
      <S.SurveyForm>
        {questions.map((question) => {
          if (["단답형", "장문형"].includes(question.type)) {
            return (
              <ResultItem
                key={question.id}
                questionId={question.id}
                answer={answers[question.id]}
              />
            );
          }

          return (
            <ResultItem
              key={question.id}
              questionId={question.id}
              selectedOptionIds={
                typeof answers[question.id] === "string"
                  ? [answers[question.id]]
                  : answers[question.id]
              }
            />
          );
        })}
      </S.SurveyForm>
    </S.Container>
  );
}

export default ResultItemList;
