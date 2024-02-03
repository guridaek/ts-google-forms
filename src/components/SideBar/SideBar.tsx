import * as S from "./SideBar.styled";
import addImg from "../../assets/addCircle.svg";
import { useAppDispatch } from "../../redux/hooks";
import { addQuestion } from "../../redux/slice/surveySlice";
import { Tooltip } from "@mui/material";
import { Button } from "../MenuBar/MenuBar.styled";

function SideBar() {
  const dispatch = useAppDispatch();

  const handleAddButtonClick = () => {
    dispatch(addQuestion());
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
