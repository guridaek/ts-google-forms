import { HTMLAttributes } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { selectQuestionById } from "../../../redux/slice/surveySlice";
import Radio from "./Radio/Radio";
import Checkbox from "./Checkbox/Checkbox";
import Dropdown from "./Dropdown/Dropdown";

interface Props extends HTMLAttributes<HTMLUListElement> {
  questionId: string;
  questionIndex: number;
}

function OptionList({ questionId, questionIndex }: Props) {
  const question = useAppSelector(selectQuestionById(questionId))!;

  if (!question || question.type === "단답형" || question.type === "장문형") return null;

  switch (question.type) {
    case "객관식 질문":
      return <Radio questionIndex={questionIndex} />;
    case "체크박스":
      return <Checkbox questionIndex={questionIndex} />;
    case "드롭다운":
      return <Dropdown questionIndex={questionIndex} />;
  }
}

export default OptionList;
