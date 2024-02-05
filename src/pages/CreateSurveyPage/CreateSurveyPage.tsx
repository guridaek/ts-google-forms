import Header from "../../components/Header/Header";
import QuestionItemList from "../../components/QuestionItemList/QuestionItemList";
import SideBar from "../../components/SideBar/SideBar";
import * as S from "./CreateSurveyPage.styled";
import { focusQuestion } from "../../redux/slice/surveySlice";
import { useAppDispatch } from "../../redux/hooks";
import { MouseEvent } from "react";

function CreateSurveyPage() {
  const dispatch = useAppDispatch();

  const handlePageClick = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(focusQuestion(-1));
    }
  };

  return (
    <S.Container onClick={handlePageClick}>
      <Header />
      <S.Body>
        <QuestionItemList />
        <SideBar />
      </S.Body>
    </S.Container>
  );
}

export default CreateSurveyPage;
