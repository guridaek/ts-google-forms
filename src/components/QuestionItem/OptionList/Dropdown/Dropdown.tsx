import { Tooltip } from "@mui/material";
import * as S from "../OptionList.styled";
import { ChangeEvent, HTMLAttributes, MouseEvent } from "react";
import {
  addOptionById,
  removeOption,
  reorderOption,
  selectQuestionList,
  setOption,
} from "../../../../redux/slice/surveySlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import dotsSixVerticalImg from "/assets/dotsSixVertical.svg";
import closeImg from "/assets/close.svg";
import { Button } from "../../../MenuBar/MenuBar.styled";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";

interface Props extends HTMLAttributes<HTMLLIElement> {
  questionIndex: number;
}

function Dropdown({ questionIndex }: Props) {
  const question = useAppSelector(selectQuestionList)[questionIndex];
  const dispatch = useAppDispatch();

  const { options } = question;

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setOption({ questionIndex: questionIndex, optionId: e.target.name, text: e.target.value })
    );
  };

  const handleRemoveButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(removeOption({ questionIndex: questionIndex, optionId: e.currentTarget.name }));
  };

  const handleAddButtonClick = () => {
    dispatch(addOptionById(question.id));
  };

  const handleDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) {
      return;
    }

    if (source.droppableId === "dropdown") {
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
        <Droppable droppableId="dropdown" direction="vertical">
          {(provided) => (
            <S.DraggableListContainer ref={provided.innerRef} {...provided.droppableProps}>
              {options.map((option, idx) => (
                <Draggable key={option.id} draggableId={option.id} index={idx}>
                  {(provided) => (
                    <S.Option key={option.id} ref={provided.innerRef} {...provided.draggableProps}>
                      <S.DraggableIcon src={dotsSixVerticalImg} {...provided.dragHandleProps} />
                      {idx + 1}
                      <S.OptionInput
                        variant="standard"
                        fullWidth={true}
                        name={option.id}
                        value={option.text}
                        onChange={handleOptionChange}
                      />
                      <Tooltip title="삭제">
                        <Button size="small" name={option.id} onClick={handleRemoveButtonClick}>
                          <S.CloseIcon src={closeImg} />
                        </Button>
                      </Tooltip>
                    </S.Option>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </S.DraggableListContainer>
          )}
        </Droppable>
      </DragDropContext>
      <S.Option>
        {options.length + 1}
        <S.addButton onClick={handleAddButtonClick}>옵션 추가</S.addButton>
      </S.Option>
    </S.Container>
  );
}

export default Dropdown;
