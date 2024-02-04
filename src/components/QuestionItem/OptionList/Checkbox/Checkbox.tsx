import { Tooltip } from "@mui/material";
import * as S from "../OptionList.styled";
import { ChangeEvent, HTMLAttributes, MouseEvent } from "react";
import {
  addOptionById,
  removeOption,
  reorderOption,
  selectFocusedQuestionIndex,
  selectQuestionList,
  setOption,
  setQuestion,
} from "../../../../redux/slice/surveySlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import dotsSixVerticalImg from "/assets/dotsSixVertical.svg";
import closeImg from "/assets/close.svg";
import { Button } from "../../../Header/Header.styled";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";

interface Props extends HTMLAttributes<HTMLDivElement> {
  questionIndex: number;
}

function Checkbox({ questionIndex }: Props) {
  const question = useAppSelector(selectQuestionList)[questionIndex];
  const dispatch = useAppDispatch();
  const isFocused = useAppSelector(selectFocusedQuestionIndex) === questionIndex;

  const { options, hasOtherOption } = question;

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setOption({ questionIndex: questionIndex, optionId: e.target.name, text: e.target.value })
    );
  };

  const handleRemoveButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(removeOption({ questionIndex: questionIndex, optionId: e.currentTarget.name }));
  };

  const handleAddOtherOptionButtonClick = () => {
    if (hasOtherOption) return;

    dispatch(
      setQuestion({
        ...question,
        hasOtherOption: true,
      })
    );
  };

  const handleRemoveOtherOptionButtonClick = () => {
    if (!hasOtherOption) return;

    dispatch(
      setQuestion({
        ...question,
        hasOtherOption: false,
      })
    );
  };

  const handleAddButtonClick = () => {
    dispatch(addOptionById(question.id));
  };

  const handleDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) {
      return;
    }

    if (source.droppableId === "checkbox") {
      dispatch(
        reorderOption({
          questionIndex: questionIndex,
          startIndex: source.index,
          endIndex: destination.index,
        })
      );
    }
  };

  return (
    <S.Container>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="checkbox" direction="vertical">
          {(provided) => (
            <S.DraggableListContainer ref={provided.innerRef} {...provided.droppableProps}>
              {options.map((option, idx) => (
                <Draggable key={option.id} draggableId={option.id} index={idx}>
                  {(provided) => (
                    <S.Option
                      key={option.id}
                      ref={provided.innerRef}
                      $isFocused={isFocused}
                      {...provided.draggableProps}
                    >
                      <S.DraggableIcon src={dotsSixVerticalImg} {...provided.dragHandleProps} />
                      <S.OptionButton type="checkbox" checked={false} readOnly={true} />
                      <S.OptionInput
                        variant="standard"
                        fullWidth={true}
                        name={option.id}
                        value={option.text}
                        onChange={handleOptionChange}
                      />
                      {isFocused && (
                        <Tooltip title="삭제">
                          <Button size="small" name={option.id} onClick={handleRemoveButtonClick}>
                            <S.CloseIcon src={closeImg} />
                          </Button>
                        </Tooltip>
                      )}
                    </S.Option>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </S.DraggableListContainer>
          )}
        </Droppable>
      </DragDropContext>
      {hasOtherOption && (
        <S.Option>
          <S.OptionButton type="checkbox" checked={false} readOnly={true} />
          <S.OtherOption>기타...</S.OtherOption>
          {isFocused && (
            <Tooltip title="삭제">
              <Button
                size="small"
                name={"remove-option-extra"}
                onClick={handleRemoveOtherOptionButtonClick}
              >
                <S.CloseIcon src={closeImg} />
              </Button>
            </Tooltip>
          )}
        </S.Option>
      )}
      {isFocused && (
        <S.Option>
          <S.OptionButton type="checkbox" checked={false} readOnly={true} />
          <S.addButton onClick={handleAddButtonClick}>옵션 추가</S.addButton>
          {!hasOtherOption && (
            <>
              또는
              <S.addButton onClick={handleAddOtherOptionButtonClick}>'기타' 추가</S.addButton>
            </>
          )}
        </S.Option>
      )}
    </S.Container>
  );
}

export default Checkbox;
