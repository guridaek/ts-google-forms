import PreviewItemList from "../../components/PreviewtemList/PreviewItemList";
import * as S from "./PreviewPage.styled";

function PreviewPage() {
  return (
    <S.Container>
      <S.Body>
        <PreviewItemList />
      </S.Body>
    </S.Container>
  );
}

export default PreviewPage;
