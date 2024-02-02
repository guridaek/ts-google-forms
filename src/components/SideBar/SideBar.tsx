import * as S from "./SideBar.styled";
import addImg from "../../assets/addCircle.svg";
import { useAppDispatch } from "../../redux/hooks";
import { addQuestion } from "../../redux/slice/surveySlice";

function SideBar() {
  const dispatch = useAppDispatch();

  const handleAddButtonClick = () => {
    dispatch(addQuestion());
  };

  return (
    <S.Container>
      <S.Icon src={addImg} width="24px" onClick={handleAddButtonClick} />
    </S.Container>
  );
}

export default SideBar;
