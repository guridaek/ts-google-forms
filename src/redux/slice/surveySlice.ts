import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const questionTypes = ["단답형", "장문형", "객관식", "체크박스", "드롭다운"] as const;

export type QuestionType = (typeof questionTypes)[number];

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  isRequired: boolean;
  options?: string[];
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
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    addQuestion: (state) => {
      state.questionList.push({
        id: new Date().getTime().toString(),
        type: "객관식",
        text: "",
        isRequired: false,
        options: ["옵션 1"],
      });
    },
  },
});

export const { setTitle, setDescription, addQuestion } = surveySlice.actions;

export const selectTitle = (state: RootState) => state.survey.title;

export const selectDescription = (state: RootState) => state.survey.description;

export const selectQuestionList = (state: RootState) => state.survey.questionList;

export const selectQuestionById = (state: RootState, id: string) =>
  state.survey.questionList.find((question) => question.id === id);

export default surveySlice.reducer;
