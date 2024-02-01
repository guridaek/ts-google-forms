import { HTMLAttributes } from "react";
import * as S from "./QuestionItem.styled";
import { Question, questionTypes } from "../QuestionItemList/QuestionItemList";
import dotsSixImg from "../../assets/dotsSix.svg";
import copyImg from "../../assets/copy.svg";
import trashCanImg from "../../assets/trashCan.svg";
import OptionList from "./OptionList/OptionList";

interface Props extends HTMLAttributes<HTMLLIElement> {
  question: Question;
}

function QuestionItem({ question }: Props) {
  return (
    <S.Container>
      <S.DraggableIcon src={dotsSixImg} />
      <S.Row>
        <S.QuestionInput placeholder="질문" value={question.text} />
        <S.TypeSelect>
          {questionTypes.map((type) => (
            <S.TypeOption selected={question.type === type}>{type}</S.TypeOption>
          ))}
        </S.TypeSelect>
      </S.Row>
      <S.Row>
        {question.options ? (
          <OptionList type={question.type} options={question.options} />
        ) : (
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
