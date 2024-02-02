import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const questionTypes = ["단답형", "장문형", "객관식", "체크박스", "드롭다운"] as const;

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
}

export interface SurveyState {
  title: string;
  description: string;
  questionList: Question[];
}

const initialState: SurveyState = {
  title: "제목 없는 설문지",
  description: "",
  questionList: [],
};

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
          type: "객관식",
          text: "",
          isRequired: false,
          options: [{ id: new Date().getTime().toString(), text: "옵션 1" }],
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
} = surveySlice.actions;

export const selectTitle = (state: RootState) => state.survey.title;

export const selectDescription = (state: RootState) => state.survey.description;

export const selectQuestionList = (state: RootState) => state.survey.questionList;

export const selectQuestionById = (id: string) => (state: RootState) =>
  state.survey.questionList.find((question) => question.id === id);

export default surveySlice.reducer;
