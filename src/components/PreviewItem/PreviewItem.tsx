import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { selectQuestionById } from "../../redux/slice/surveySlice";
import * as S from "./PreviewItem.styled";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  questionId: string;
  register: UseFormRegister<FieldValues>;
  formState: FieldValues;
}

function PreviewItem({ questionId, register, formState }: Props) {
  const question = useAppSelector(selectQuestionById(questionId));

  if (!question) return null;

  const isError = questionId in formState.errors;

  switch (question.type) {
    case "단답형":
      return (
        <S.Container $isError={isError}>
          <S.title>
            {question.text}
            {question.isRequired && <S.RequiredMark> *</S.RequiredMark>}
          </S.title>
          <S.ShortTextInput
            variant="standard"
            placeholder="내 답변"
            error={isError}
            {...register(questionId, { required: question.isRequired })}
          />
          {isError && <S.ErrorMessage>필수 질문입니다.</S.ErrorMessage>}
        </S.Container>
      );
    case "장문형":
      return (
        <S.Container $isError={isError}>
          <S.title>
            {question.text}
            {question.isRequired && <S.RequiredMark> *</S.RequiredMark>}
          </S.title>
          <S.LongTextInput
            variant="standard"
            multiline
            placeholder="내 답변"
            error={isError}
            {...register(questionId, { required: question.isRequired })}
          />
          {isError && <S.ErrorMessage>필수 질문입니다.</S.ErrorMessage>}
        </S.Container>
      );
    case "객관식 질문":
      return (
        <S.Container $isError={isError}>
          <S.title>
            {question.text}
            {question.isRequired && <S.RequiredMark> *</S.RequiredMark>}
          </S.title>
          <RadioGroup aria-labelledby="survey-group">
            {question.options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.text}
                control={<Radio />}
                label={option.text}
                {...register(questionId, { required: question.isRequired })}
              />
            ))}
          </RadioGroup>
          {isError && <S.ErrorMessage>필수 질문입니다.</S.ErrorMessage>}
        </S.Container>
      );
    case "체크박스":
      return (
        <S.Container $isError={isError}>
          <S.title>
            {question.text}
            {question.isRequired && <S.RequiredMark> *</S.RequiredMark>}
          </S.title>
          <FormGroup>
            {question.options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.text}
                control={<Checkbox />}
                label={option.text}
                {...register(questionId, { required: question.isRequired })}
              />
            ))}
          </FormGroup>
          {isError && <S.ErrorMessage>필수 질문입니다.</S.ErrorMessage>}
        </S.Container>
      );
    case "드롭다운":
      return (
        <S.Container $isError={isError}>
          <S.title>
            {question.text}
            {question.isRequired && <S.RequiredMark> *</S.RequiredMark>}
          </S.title>
          <S.DropdownContainer>
            <Select fullWidth {...register(questionId, { required: question.isRequired })}>
              {question.options.map((option) => (
                <MenuItem key={option.id} value={option.text}>
                  {option.text}
                </MenuItem>
              ))}
            </Select>
          </S.DropdownContainer>
          {isError && <S.ErrorMessage>필수 질문입니다.</S.ErrorMessage>}
        </S.Container>
      );
  }
}

export default PreviewItem;
