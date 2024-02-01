import { HTMLAttributes } from "react";
import * as S from "./QuestionItem.styled";
import { Question, questionTypes } from "../QuestionItemList/QuestionItemList";
import dotsSixImg from "../../assets/dotsSix.svg";
import copyImg from "../../assets/copy.svg";
import trashCanImg from "../../assets/trashCan.svg";

interface Props extends HTMLAttributes<HTMLLIElement> {
  question: Question;
}

function QuestionItem({ question }: Props) {
  return (
    <S.Container>
      <S.DraggableIcon src={dotsSixImg} />
      <S.Row>
        <S.QuestionInput placeholder="질문" />
        <S.TypeSelect>
          {questionTypes.map((type) => (
            <S.TypeOption>{type}</S.TypeOption>
          ))}
        </S.TypeSelect>
      </S.Row>
      <S.Row>
        {["단답형", "장문형"].includes(question.type) && (
          <S.Answer>{`${question.type} 텍스트`}</S.Answer>
        )}
      </S.Row>
      <S.Row>
        <S.BottomIcons>
          <S.Icon src={copyImg} width="24px" />
          <S.Icon src={trashCanImg} width="24px" />
        </S.BottomIcons>
        필수
        <S.ToggleButton type="checkbox" />
      </S.Row>
    </S.Container>
  );
}

export default QuestionItem;
