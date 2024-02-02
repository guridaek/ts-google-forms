import MenuBar from "../components/MenuBar/MenuBar";
import QuestionItemList from "../components/QuestionItemList/QuestionItemList";
import SideBar from "../components/SideBar/SideBar";
import * as S from "./CreateSurveyPage.styled";

function CreateSurveyPage() {
  return (
    <S.Container>
      <MenuBar />
      <S.Body>
        <QuestionItemList />
        <SideBar />
      </S.Body>
    </S.Container>
  );
}

export default CreateSurveyPage;
