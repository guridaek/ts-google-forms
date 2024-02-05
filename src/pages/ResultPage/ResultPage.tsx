import { useLocation } from "react-router-dom";
import ResultItemList from "../../components/ResultItemList/ResultItemList";
import * as S from "./ResultPage.styled";

function ResultPage() {
  const { state } = useLocation();

  return (
    <S.Container>
      <S.Body>
        <ResultItemList answers={state?.answers} />
      </S.Body>
    </S.Container>
  );
}

export default ResultPage;
