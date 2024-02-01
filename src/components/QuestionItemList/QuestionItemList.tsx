import QuestionItem from "../QuestionItem/QuestionItem";
import * as S from "./QuestionItemList.styled";

export const questionTypes = ["단답형", "장문형", "객관식", "체크박스", "드롭다운"] as const;

export type QuestionType = (typeof questionTypes)[number];

export interface Question {
  type: QuestionType;
  text: string;
  options?: string[];
}

const questions: Question[] = [
  { type: "단답형", text: "단답형 질문입니다." },
  { type: "장문형", text: "장문형 질문입니다." },
  { type: "객관식", text: "객관식 질문입니다.", options: ["선택지 1", "선택지 2", "선택지 3"] },
  { type: "체크박스", text: "체크박스 질문입니다.", options: ["선택지 1", "선택지 2", "선택지 3"] },
  { type: "드롭다운", text: "드롭다운 질문입니다.", options: ["선택지 1", "선택지 2", "선택지 3"] },
];

function QuestionItemList() {
  return (
    <S.Container>
      <S.SurveyTitleContainer>
        <S.titleInput type="text" defaultValue="제목 없는 설문지" placeholder="설문지 제목" />
        <S.descriptionInput type="text" placeholder="설문지 설명" />
      </S.SurveyTitleContainer>
      {questions.map((question) => (
        <QuestionItem question={question} />
      ))}
    </S.Container>
  );
}

export default QuestionItemList;
