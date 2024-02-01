import * as S from "./MenuBar.styled";
import eyeImg from "../../assets/eye.png";

function MenuBar() {
  return (
    <S.Container>
      <S.Icon src={eyeImg} width="30px" />
    </S.Container>
  );
}

export default MenuBar;
