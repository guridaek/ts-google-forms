import { ChangeEvent, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setQuestion, selectQuestionById, addOptionById } from "../../../redux/slice/surveySlice";
import * as S from "./OptionList.styled";
import dotsSixVerticalImg from "../../../assets/dotsSixVertical.svg";
import closeImg from "../../../assets/close.svg";
import { Button } from "../../MenuBar/MenuBar.styled";
import { Tooltip } from "@mui/material";

interface Props {
  questionId: string;
}

function OptionList({ questionId }: Props) {
  const dispatch = useAppDispatch();

  const question = useAppSelector(selectQuestionById(questionId))!;

  if (!question) return null;

  const { type, options, hasOtherOption } = question;

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

  const handleAddOtherOptionButtonClick = () => {
    if (hasOtherOption) return;

    dispatch(
      setQuestion({
        ...question,
        hasOtherOption: true,
      })
    );
  };

  const handleRemoveOtherOptionButtonClick = () => {
    if (!hasOtherOption) return;

    dispatch(
      setQuestion({
        ...question,
        hasOtherOption: false,
      })
    );
  };

  switch (type) {
    case "객관식 질문":
      return (
        <S.Container>
          {options.map((option, idx) => (
            <S.Option key={option.id}>
              <S.DraggableIcon src={dotsSixVerticalImg} />
              <S.OptionButton type="radio" checked={false} readOnly={true} />
              <S.OptionInput
                variant="standard"
                fullWidth={true}
                name={`option-${idx}`}
                value={option.text}
                onChange={handleOptionChange}
              />
              <Tooltip title="삭제">
                <Button
                  size="small"
                  name={`remove-option-${idx}`}
                  onClick={handleRemoveButtonClick}
                >
                  <S.CloseIcon src={closeImg} width="26px" />
                </Button>
              </Tooltip>
            </S.Option>
          ))}
          {hasOtherOption && (
            <S.Option>
              <S.OptionButton type="radio" checked={false} readOnly={true} />
              <S.OtherOption>기타...</S.OtherOption>
              <Tooltip title="삭제">
                <Button
                  size="small"
                  name={"remove-option-extra"}
                  onClick={handleRemoveOtherOptionButtonClick}
                >
                  <S.CloseIcon src={closeImg} width="26px" />
                </Button>
              </Tooltip>
            </S.Option>
          )}
          <S.Option>
            <S.OptionButton type="radio" checked={false} readOnly={true} />
            <S.addButton onClick={handleAddButtonClick}>옵션 추가</S.addButton>
            {!hasOtherOption && (
              <>
                또는
                <S.addButton onClick={handleAddOtherOptionButtonClick}>'기타' 추가</S.addButton>
              </>
            )}
          </S.Option>
        </S.Container>
      );

    case "체크박스":
      return (
        <S.Container>
          {options.map((option, idx) => (
            <S.Option key={option.id}>
              <S.DraggableIcon src={dotsSixVerticalImg} />
              <S.OptionButton type="checkbox" checked={false} readOnly={true} />
              <S.OptionInput
                variant="standard"
                fullWidth={true}
                name={`option-${idx}`}
                value={option.text}
                onChange={handleOptionChange}
              />
              <Tooltip title="삭제">
                <Button
                  size="small"
                  name={`remove-option-${idx}`}
                  onClick={handleRemoveButtonClick}
                >
                  <S.CloseIcon src={closeImg} />
                </Button>
              </Tooltip>
            </S.Option>
          ))}
          {hasOtherOption && (
            <S.Option>
              <S.OptionButton type="checkbox" checked={false} readOnly={true} />
              <S.OtherOption>기타...</S.OtherOption>
              <Tooltip title="삭제">
                <Button
                  size="small"
                  name={"remove-option-extra"}
                  onClick={handleRemoveOtherOptionButtonClick}
                >
                  <S.CloseIcon src={closeImg} />
                </Button>
              </Tooltip>
            </S.Option>
          )}
          <S.Option>
            <S.OptionButton type="checkbox" checked={false} readOnly={true} />
            <S.addButton onClick={handleAddButtonClick}>옵션 추가</S.addButton>
            {!hasOtherOption && (
              <>
                또는
                <S.addButton onClick={handleAddOtherOptionButtonClick}>'기타' 추가</S.addButton>
              </>
            )}
          </S.Option>
        </S.Container>
      );

    case "드롭다운":
    default:
      return (
        <S.Container>
          {options.map((option, idx) => (
            <S.Option key={option.id}>
              <S.DraggableIcon src={dotsSixVerticalImg} />
              {idx + 1}
              <S.OptionInput
                variant="standard"
                fullWidth={true}
                name={`option-${idx}`}
                value={option.text}
                onChange={handleOptionChange}
              />
              <Tooltip title="삭제">
                <Button
                  size="small"
                  name={`remove-option-${idx}`}
                  onClick={handleRemoveButtonClick}
                >
                  <S.CloseIcon src={closeImg} />
                </Button>
              </Tooltip>
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
