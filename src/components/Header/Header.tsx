import * as S from "./Header.styled";
import eyeImg from "/assets/eye.png";
import { Tooltip } from "@mui/material";

function Header() {
  const openPreviewPage = () => {
    window.open("/preview", "_blank");
  };

  return (
    <S.Container>
      <Tooltip title="미리보기" onClick={openPreviewPage}>
        <S.Button>
          <S.Icon src={eyeImg} width="28px" />
        </S.Button>
      </Tooltip>
    </S.Container>
  );
}

export default Header;
