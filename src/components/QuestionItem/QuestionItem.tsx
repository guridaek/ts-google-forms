import { ChangeEvent, HTMLAttributes } from "react";
import * as S from "./QuestionItem.styled";
import dotsSixImg from "/assets/dotsSix.svg";
import copyImg from "/assets/copy.svg";
import trashCanImg from "/assets/trashCan.svg";
import OptionList from "./OptionList/OptionList";
import {
  QuestionType,
  setQuestion,
  questionTypes,
  selectQuestionById,
  duplicateQuestionById,
  removeQuestionById,
  selectFocusedQuestionIndex,
  focusQuestion,
} from "../../redux/slice/surveySlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SelectChangeEvent, Switch, Tooltip } from "@mui/material";
import { Button } from "../MenuBar/MenuBar.styled";
import { Draggable } from "react-beautiful-dnd";

interface Props extends HTMLAttributes<HTMLLIElement> {
  questionId: string;
  questionIndex: number;
}

function QuestionItem({ questionId, questionIndex }: Props) {
  const dispatch = useAppDispatch();

  const question = useAppSelector(selectQuestionById(questionId))!;
  const isFocused = useAppSelector(selectFocusedQuestionIndex) === questionIndex;

  if (!question) return null;

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuestion({ ...question, text: e.target.value }));
  };

  const handleTypeChange = (e: SelectChangeEvent<unknown>) => {
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

  const handleItemClick = () => {
    dispatch(focusQuestion(questionIndex));
  };

  return (
    <Draggable draggableId={questionId} index={questionIndex} key={questionId}>
      {(provided) => (
        <S.Container
          ref={provided.innerRef}
          onClick={handleItemClick}
          $isFocused={isFocused}
          {...provided.draggableProps}
        >
          <S.DraggableIcon src={dotsSixImg} {...provided.dragHandleProps} />
          <S.Row>
            <S.QuestionInput
              variant={isFocused ? "filled" : "standard"}
              size="small"
              fullWidth={isFocused}
              placeholder="질문"
              value={question?.text}
              onChange={handleTextChange}
              $isFocused={isFocused}
            />
            {isFocused && (
              <S.TypeSelect value={question.type} onChange={handleTypeChange}>
                {questionTypes.map((type) => (
                  <S.TypeOption key={type} value={type}>
                    {type}
                  </S.TypeOption>
                ))}
              </S.TypeSelect>
            )}
          </S.Row>
          <S.Row>
            {["단답형", "장문형"].includes(question.type) ? (
              <S.Answer>{`${question?.type} 텍스트`}</S.Answer>
            ) : (
              <OptionList questionId={questionId} questionIndex={questionIndex} />
            )}
          </S.Row>
          {isFocused && (
            <S.Footer>
              <S.BottomIcons>
                <Tooltip title="복사">
                  <Button size="small">
                    <S.Icon src={copyImg} width="24px" onClick={handleDuplicateButtonClick} />
                  </Button>
                </Tooltip>
                <Tooltip title="삭제">
                  <Button size="small">
                    <S.Icon src={trashCanImg} width="24px" onClick={handleRemoveButtonClick} />
                  </Button>
                </Tooltip>
              </S.BottomIcons>
              <S.VerticalBar></S.VerticalBar>
              필수
              <Switch checked={question?.isRequired} onChange={handleIsRequiredChange} />
            </S.Footer>
          )}
        </S.Container>
      )}
    </Draggable>
  );
}

export default QuestionItem;
