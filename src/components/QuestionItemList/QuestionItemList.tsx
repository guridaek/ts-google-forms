import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  reorderQuestion,
  selectDescription,
  selectQuestionList,
  selectTitle,
  setDescription,
  setTitle,
} from "../../redux/slice/surveySlice";
import QuestionItem from "../QuestionItem/QuestionItem";
import * as S from "./QuestionItemList.styled";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

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

  const handleDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) {
      return;
    }

    if (source.droppableId === "questionItemList") {
      dispatch(
        reorderQuestion({
          startIndex: source.index,
          endIndex: destination.index,
        })
      );
    }
  };

  return (
    <S.Container>
      <S.SurveyTitleContainer>
        <S.titleInput
          variant="standard"
          type="text"
          value={title}
          placeholder="설문지 제목"
          onChange={handleTitleChange}
        />
        <S.descriptionInput
          variant="standard"
          type="text"
          value={description}
          placeholder="설문지 설명"
          onChange={handleDescriptionChange}
        />
      </S.SurveyTitleContainer>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="questionItemList" direction="vertical">
          {(provided) => (
            <S.SurveyListContainer {...provided.droppableProps} ref={provided.innerRef}>
              {questions.map((question, idx) => (
                <QuestionItem key={question.id} questionId={question.id} questionIndex={idx} />
              ))}
              {provided.placeholder}
            </S.SurveyListContainer>
          )}
        </Droppable>
      </DragDropContext>
    </S.Container>
  );
}

export default QuestionItemList;
