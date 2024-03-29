import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { OTHER_OPTION_ID, selectQuestionById, setQuestion } from "../../redux/slice/surveySlice";
import * as S from "./PreviewItem.styled";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { FocusEvent } from "react";

interface Props {
  questionId: string;
  register: UseFormRegister<FieldValues>;
  formState: FieldValues;
}

function PreviewItem({ questionId, register, formState }: Props) {
  const question = useAppSelector(selectQuestionById(questionId));

  const dispatch = useAppDispatch();

  if (!question) return null;

  const isError = questionId in formState.errors;

  const handleOtherOptionBlur = (e: FocusEvent<HTMLInputElement>) => {
    dispatch(setQuestion({ ...question, otherOption: e.target.value }));
  };

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
          <RadioGroup>
            {question.options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.id}
                control={<Radio />}
                label={option.text}
                {...register(questionId, { required: question.isRequired })}
              />
            ))}
            {question.hasOtherOption && (
              <FormControlLabel
                value={OTHER_OPTION_ID}
                control={<Radio />}
                label={
                  <S.OtherOptionInputContainer>
                    기타:
                    <TextField variant="standard" onBlur={handleOtherOptionBlur} />
                  </S.OtherOptionInputContainer>
                }
                {...register(questionId, { required: question.isRequired })}
              />
            )}
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
                value={option.id}
                control={<Checkbox />}
                label={option.text}
                {...register(questionId, { required: question.isRequired })}
              />
            ))}
            {question.hasOtherOption && (
              <FormControlLabel
                value={OTHER_OPTION_ID}
                control={<Checkbox />}
                label={
                  <S.OtherOptionInputContainer>
                    기타:
                    <TextField variant="standard" onBlur={handleOtherOptionBlur} />
                  </S.OtherOptionInputContainer>
                }
                {...register(questionId, { required: question.isRequired })}
              />
            )}
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
            <FormControl sx={{ minWidth: "300px" }}>
              <Select
                displayEmpty
                autoWidth
                defaultValue=""
                {...register(questionId, { required: question.isRequired })}
              >
                <MenuItem value="" disabled>
                  선택
                </MenuItem>
                {question.options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </S.DropdownContainer>
          {isError && <S.ErrorMessage>필수 질문입니다.</S.ErrorMessage>}
        </S.Container>
      );
  }
}

export default PreviewItem;
