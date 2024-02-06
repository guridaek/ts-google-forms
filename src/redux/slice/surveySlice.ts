import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../store";

export const OTHER_OPTION_ID = "other";

export const questionTypes = ["단답형", "장문형", "객관식 질문", "체크박스", "드롭다운"] as const;

export type QuestionType = (typeof questionTypes)[number];

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  isRequired: boolean;
  options: Option[];
  hasOtherOption: boolean;
  otherOption?: string;
}

export interface SurveyState {
  title: string;
  description: string;
  questionList: Question[];
  focusedQuestionIndex: number;
}

const initialState: SurveyState = {
  title: "제목 없는 설문지",
  description: "",
  questionList: [],
  focusedQuestionIndex: -1,
};

interface ReorderQuestionPayload {
  startIndex: number;
  endIndex: number;
}

interface ReorderOptionPayload extends ReorderQuestionPayload {
  questionIndex: number;
}

interface SetOptionPayload {
  questionIndex: number;
  optionId: string;
  text: string;
}

interface RemoveOptionPayload {
  questionIndex: number;
  optionId: string;
}

export const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    addQuestion: (state) => {
      state.questionList = [
        ...state.questionList,
        {
          id: new Date().getTime().toString(),
          type: "객관식 질문",
          text: "",
          isRequired: false,
          options: [{ id: new Date().getTime().toString(), text: "옵션 1" }],
          hasOtherOption: false,
        },
      ];
    },
    removeQuestionById: (state, action: PayloadAction<string>) => {
      state.questionList = state.questionList.filter((question) => question.id !== action.payload);
    },
    setQuestion: (state, action: PayloadAction<Question>) => {
      state.questionList = state.questionList.map((question) => {
        return question.id === action.payload.id ? action.payload : question;
      });
    },
    duplicateQuestionById: (state, action: PayloadAction<string>) => {
      const index = state.questionList.findIndex((question) => question.id === action.payload);

      if (index === -1) return;

      const updatedList = [...state.questionList];
      updatedList.splice(index + 1, 0, {
        ...state.questionList[index],
        id: new Date().getTime().toString(),
      });

      state.questionList = updatedList;
    },
    addOptionById: (state, action: PayloadAction<string>) => {
      state.questionList = state.questionList.map((question) => {
        if (question.id === action.payload) {
          return {
            ...question,
            options: [
              ...question.options,
              {
                id: new Date().getTime().toString(),
                text: `옵션 ${question.options.length + 1}`,
              },
            ],
          };
        }

        return question;
      });
    },
    reorderQuestion: (state, action: PayloadAction<ReorderQuestionPayload>) => {
      const { startIndex, endIndex } = action.payload;

      const updatedList = [...state.questionList];
      const [removedQuestion] = updatedList.splice(startIndex, 1);
      updatedList.splice(endIndex, 0, removedQuestion);

      state.questionList = updatedList;
    },
    reorderOption: (state, action: PayloadAction<ReorderOptionPayload>) => {
      const { questionIndex, startIndex, endIndex } = action.payload;

      const updatedList = [...state.questionList];
      const [removedOption] = updatedList[questionIndex].options.splice(startIndex, 1);

      updatedList[questionIndex].options.splice(endIndex, 0, removedOption);

      state.questionList = updatedList;
    },
    setOption: (state, action: PayloadAction<SetOptionPayload>) => {
      const { questionIndex, optionId, text } = action.payload;

      const options = state.questionList[questionIndex].options;

      const updatedOptions = options.map((option) =>
        option.id === optionId ? { ...option, text: text } : option
      );

      state.questionList = state.questionList.map((question, idx) =>
        idx === questionIndex ? { ...question, options: updatedOptions } : question
      );
    },
    removeOption: (state, action: PayloadAction<RemoveOptionPayload>) => {
      const { questionIndex, optionId } = action.payload;

      const options = state.questionList[questionIndex].options;

      const updatedOptions = options.filter((option) => option.id !== optionId);

      state.questionList = state.questionList.map((question, idx) =>
        idx === questionIndex ? { ...question, options: updatedOptions } : question
      );
    },
    focusQuestion: (state, action: PayloadAction<number>) => {
      state.focusedQuestionIndex = action.payload;
    },
  },
});

export const {
  setTitle,
  setDescription,
  addQuestion,
  removeQuestionById,
  setQuestion,
  duplicateQuestionById,
  addOptionById,
  reorderQuestion,
  reorderOption,
  setOption,
  removeOption,
  focusQuestion,
} = surveySlice.actions;

export const selectTitle = (state: RootState) => state.survey.title;

export const selectDescription = (state: RootState) => state.survey.description;

export const selectQuestionList = (state: RootState) => state.survey.questionList;

export const selectQuestionById = (id: string) => (state: RootState) =>
  state.survey.questionList.find((question) => question.id === id);

export const selectFocusedQuestionIndex = (state: RootState) => state.survey.focusedQuestionIndex;

export default surveySlice.reducer;
