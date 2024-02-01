import MenuBar from "../components/MenuBar/MenuBar";
import QuestionItemList from "../components/QuestionItemList/QuestionItemList";
import * as S from "./CreateSurveyPage.styled";

function CreateSurveyPage() {
  return (
    <S.Container>
      <MenuBar />
      <QuestionItemList />
    </S.Container>
  );
}

export default CreateSurveyPage;
