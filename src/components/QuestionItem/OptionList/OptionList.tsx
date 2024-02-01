import { QuestionType } from "../../QuestionItemList/QuestionItemList";
import * as S from "./OptionList.styled";

interface Props {
  type: QuestionType;
  options: string[];
}

function OptionList({ type, options }: Props) {
  switch (type) {
    case "객관식":
      return (
        <S.Container>
          {options.map((option) => (
            <S.Option>
              <S.OptionButton type="radio" checked={false} />
              <S.OptionInput value={option} />
              <S.removeButton>X</S.removeButton>
            </S.Option>
          ))}
          <S.Option>
            <S.OptionButton type="radio" checked={false} />
            <S.addButton>옵션 추가</S.addButton>
            또는
            <S.addButton>'기타' 추가</S.addButton>
          </S.Option>
        </S.Container>
      );

    case "체크박스":
      return (
        <S.Container>
          {options.map((option) => (
            <S.Option>
              <S.OptionButton type="checkbox" checked={false} />
              <S.OptionInput value={option} />
              <S.removeButton>X</S.removeButton>
            </S.Option>
          ))}
          <S.Option>
            <S.OptionButton type="checkbox" checked={false} />
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
            <S.Option>
              {idx + 1}
              <S.OptionInput value={option} />
              <S.removeButton>X</S.removeButton>
            </S.Option>
          ))}
          <S.Option>
            {options.length + 1}
            <S.addButton>옵션 추가</S.addButton>
          </S.Option>
        </S.Container>
      );
  }
}

export default OptionList;
