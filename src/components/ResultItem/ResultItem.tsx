import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { selectQuestionById } from "../../redux/slice/surveySlice";
import * as S from "./ResultItem.styled";

interface Props {
  questionId: string;
  answer?: string;
  selectedOptionIds?: string[];
}

function ResultItem({ questionId, answer, selectedOptionIds }: Props) {
  const question = useAppSelector(selectQuestionById(questionId));

  if (!question) return null;

  switch (question.type) {
    case "단답형":
      return (
        <S.Container>
          <S.title>
            {question.text}
            {question.isRequired && <S.RequiredMark> *</S.RequiredMark>}
          </S.title>
          <S.ShortTextInput variant="standard" placeholder="내 답변" value={answer} disabled />
        </S.Container>
      );
    case "장문형":
      return (
        <S.Container>
          <S.title>
            {question.text}
            {question.isRequired && <S.RequiredMark> *</S.RequiredMark>}
          </S.title>
          <S.LongTextInput
            variant="standard"
            multiline
            placeholder="내 답변"
            value={answer}
            disabled
          />
        </S.Container>
      );
    case "객관식 질문":
      return (
        <S.Container>
          <S.title>
            {question.text}
            {question.isRequired && <S.RequiredMark> *</S.RequiredMark>}
          </S.title>
          <RadioGroup aria-labelledby="survey-group">
            {question.options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.id}
                control={<Radio readOnly disabled={!selectedOptionIds?.includes(option.id)} />}
                label={option.text}
                checked={selectedOptionIds?.includes(option.id)}
              />
            ))}
          </RadioGroup>
        </S.Container>
      );
    case "체크박스":
      return (
        <S.Container>
          <S.title>
            {question.text}
            {question.isRequired && <S.RequiredMark> *</S.RequiredMark>}
          </S.title>
          <FormGroup>
            {question.options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.text}
                control={<Checkbox readOnly disabled={!selectedOptionIds?.includes(option.id)} />}
                label={option.text}
                checked={selectedOptionIds?.includes(option.id)}
              />
            ))}
          </FormGroup>
        </S.Container>
      );
    case "드롭다운":
      return (
        <S.Container>
          <S.title>
            {question.text}
            {question.isRequired && <S.RequiredMark> *</S.RequiredMark>}
          </S.title>
          <S.DropdownContainer>
            <FormControl sx={{ minWidth: "300px" }}>
              <Select
                displayEmpty
                autoWidth
                value={selectedOptionIds ? selectedOptionIds[0] : ""}
                disabled
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
        </S.Container>
      );
  }
}

export default ResultItem;
