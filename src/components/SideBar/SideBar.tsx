import * as S from "./SideBar.styled";
import addImg from "/assets/addCircle.svg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addQuestion, focusQuestion, selectQuestionList } from "../../redux/slice/surveySlice";
import { Tooltip } from "@mui/material";
import { Button } from "../Header/Header.styled";

function SideBar() {
  const dispatch = useAppDispatch();
  const questionList = useAppSelector(selectQuestionList);

  const scrollToBottom = () => {
    setTimeout(() => {
      window.scrollTo(0, document.documentElement.scrollHeight);
    }, 0);
  };

  const handleAddButtonClick = () => {
    dispatch(focusQuestion(questionList.length));
    dispatch(addQuestion());

    scrollToBottom();
  };

  return (
    <S.Container>
      <Tooltip title="질문 추가" placement="right">
        <Button size="small">
          <S.Icon src={addImg} width="24px" onClick={handleAddButtonClick} />
        </Button>
      </Tooltip>
    </S.Container>
  );
}

export default SideBar;
