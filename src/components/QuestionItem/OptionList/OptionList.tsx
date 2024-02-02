import { ChangeEvent, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setQuestion, selectQuestionById, addOptionById } from "../../../redux/slice/surveySlice";
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
    const optionIndex = Number(e.target.name.slice(-1));

    dispatch(
      setQuestion({
        ...question,
        options: options.map((option, idx) =>
          idx === optionIndex ? { ...option, text: e.target.value } : option
        ),
      })
    );
  };

  const handleAddButtonClick = () => {
    dispatch(addOptionById(questionId));
  };

  const handleRemoveButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    const optionIndex = Number(e.currentTarget.name.slice(-1));

    const updatedOptions = [...options];
    updatedOptions.splice(optionIndex, 1);

    dispatch(
      setQuestion({
        ...question,
        options: updatedOptions,
      })
    );
  };

  switch (type) {
    case "객관식":
      return (
        <S.Container>
          {options.map((option, idx) => (
            <S.Option key={option.id}>
              <S.OptionButton type="radio" checked={false} readOnly={true} />
              <S.OptionInput
                name={`option-${idx}`}
                value={option.text}
                onChange={handleOptionChange}
              />
              <S.removeButton name={`remove-option-${idx}`} onClick={handleRemoveButtonClick}>
                X
              </S.removeButton>
            </S.Option>
          ))}
          <S.Option>
            <S.OptionButton type="radio" checked={false} readOnly={true} />
            <S.addButton onClick={handleAddButtonClick}>옵션 추가</S.addButton>
            또는
            <S.addButton>'기타' 추가</S.addButton>
          </S.Option>
        </S.Container>
      );

    case "체크박스":
      return (
        <S.Container>
          {options.map((option, idx) => (
            <S.Option key={option.id}>
              <S.OptionButton type="checkbox" checked={false} readOnly={true} />
              <S.OptionInput
                name={`option-${idx}`}
                value={option.text}
                onChange={handleOptionChange}
              />
              <S.removeButton name={`remove-option-${idx}`} onClick={handleRemoveButtonClick}>
                X
              </S.removeButton>
            </S.Option>
          ))}
          <S.Option>
            <S.OptionButton type="checkbox" checked={false} readOnly={true} />
            <S.addButton onClick={handleAddButtonClick}>옵션 추가</S.addButton>
            또는
            <S.addButton>'기타' 추가</S.addButton>
          </S.Option>
        </S.Container>
      );

    case "드롭다운":
    default:
      return (
        <S.Container>
          {options.map((option, idx) => (
            <S.Option key={option.id}>
              {idx + 1}
              <S.OptionInput
                name={`option-${idx}`}
                value={option.text}
                onChange={handleOptionChange}
              />
              <S.removeButton name={`remove-option-${idx}`} onClick={handleRemoveButtonClick}>
                X
              </S.removeButton>
            </S.Option>
          ))}
          <S.Option>
            {options.length + 1}
            <S.addButton onClick={handleAddButtonClick}>옵션 추가</S.addButton>
          </S.Option>
        </S.Container>
      );
  }
}

export default OptionList;
