import { ChangeEvent, HTMLAttributes } from "react";
import * as S from "./QuestionItem.styled";
import dotsSixImg from "../../assets/dotsSix.svg";
import copyImg from "../../assets/copy.svg";
import trashCanImg from "../../assets/trashCan.svg";
import OptionList from "./OptionList/OptionList";
import {
  QuestionType,
  setQuestion,
  questionTypes,
  selectQuestionById,
  duplicateQuestionById,
  removeQuestionById,
} from "../../redux/slice/surveySlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface Props extends HTMLAttributes<HTMLLIElement> {
  questionId: string;
}

function QuestionItem({ questionId }: Props) {
  const dispatch = useAppDispatch();

  const question = useAppSelector(selectQuestionById(questionId))!;

  if (!question) return null;

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuestion({ ...question, text: e.target.value }));
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setQuestion({ ...question, type: e.target.value as QuestionType }));
  };

  const handleIsRequiredChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuestion({ ...question, isRequired: e.target.checked }));
  };

  const handleDuplicateButtonClick = () => {
    dispatch(duplicateQuestionById(questionId));
  };

  const handleRemoveButtonClick = () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      dispatch(removeQuestionById(questionId));
    }
  };

  return (
    <S.Container>
      <S.DraggableIcon src={dotsSixImg} />
      <S.Row>
        <S.QuestionInput placeholder="질문" value={question?.text} onChange={handleTextChange} />
        <S.TypeSelect defaultValue={question.type} onChange={handleTypeChange}>
          {questionTypes.map((type) => (
            <S.TypeOption key={type}>{type}</S.TypeOption>
          ))}
        </S.TypeSelect>
      </S.Row>
      <S.Row>
        {["단답형", "장문형"].includes(question.type) ? (
          <S.Answer>{`${question?.type} 텍스트`}</S.Answer>
        ) : (
          <OptionList questionId={questionId} />
        )}
      </S.Row>
      <S.Row>
        <S.BottomIcons>
          <S.Icon src={copyImg} width="24px" onClick={handleDuplicateButtonClick} />
          <S.Icon src={trashCanImg} width="24px" onClick={handleRemoveButtonClick} />
        </S.BottomIcons>
        필수
        <S.ToggleButton
          type="checkbox"
          defaultChecked={question?.isRequired}
          onChange={handleIsRequiredChange}
        />
      </S.Row>
    </S.Container>
  );
}

export default QuestionItem;
