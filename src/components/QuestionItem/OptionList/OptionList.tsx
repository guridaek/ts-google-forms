import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setQuestion, selectQuestionById } from "../../../redux/slice/surveySlice";
import * as S from "./OptionList.styled";

interface Props {
  questionId: string;
}

function OptionList({ questionId }: Props) {
  const dispatch = useAppDispatch();

  const question = useAppSelector(selectQuestionById(questionId))!;

  if (!question) return null;

  const { type, options } = question;

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const optionIndex = Number(e.target.name.slice(6));

    dispatch(
      setQuestion({
        ...question,
        options: options?.map((option, idx) => (idx === optionIndex ? e.target.value : option)),
      })
    );
  };

  switch (type) {
    case "객관식":
      return (
        <S.Container>
          {options?.map((option, idx) => (
            <S.Option key={`option-${idx}`}>
              <S.OptionButton type="radio" checked={false} readOnly={true} />
              <S.OptionInput name={`option${idx}`} value={option} onChange={handleOptionChange} />
              <S.removeButton>X</S.removeButton>
            </S.Option>
          ))}
          <S.Option>
            <S.OptionButton type="radio" checked={false} readOnly={true} />
            <S.addButton>옵션 추가</S.addButton>
            또는
            <S.addButton>'기타' 추가</S.addButton>
          </S.Option>
        </S.Container>
      );

    case "체크박스":
      return (
        <S.Container>
          {options?.map((option, idx) => (
            <S.Option key={`option-${idx}`}>
              <S.OptionButton type="checkbox" checked={false} readOnly={true} />
              <S.OptionInput name={`option${idx}`} value={option} onChange={handleOptionChange} />
              <S.removeButton>X</S.removeButton>
            </S.Option>
          ))}
          <S.Option>
            <S.OptionButton type="checkbox" checked={false} readOnly={true} />
            <S.addButton>옵션 추가</S.addButton>
            또는
            <S.addButton>'기타' 추가</S.addButton>
          </S.Option>
        </S.Container>
      );

    case "드롭다운":
    default:
      return (
        <S.Container>
          {options?.map((option, idx) => (
            <S.Option key={`option-${idx}`}>
              {idx + 1}
              <S.OptionInput name={`option${idx}`} value={option} onChange={handleOptionChange} />
              <S.removeButton>X</S.removeButton>
            </S.Option>
          ))}
          <S.Option>
            {options?.length ? options.length + 1 : 1}
            <S.addButton>옵션 추가</S.addButton>
          </S.Option>
        </S.Container>
      );
  }
}

export default OptionList;
