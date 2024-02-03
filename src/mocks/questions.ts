import { Question } from "../redux/slice/surveySlice";

export const questions: Question[] = [
  {
    id: "1",
    type: "단답형",
    text: "단답형 질문입니다.",
    options: [],
    isRequired: true,
    hasOtherOption: false,
  },
  {
    id: "2",
    type: "장문형",
    text: "장문형 질문입니다.",
    options: [],
    isRequired: false,
    hasOtherOption: false,
  },
  {
    id: "3",
    type: "객관식 질문",
    text: "객관식 질문입니다.",
    options: [
      { id: "1", text: "선택지 1" },
      { id: "2", text: "선택지 2" },
      { id: "3", text: "선택지 3" },
    ],
    isRequired: true,
    hasOtherOption: false,
  },
  {
    id: "4",
    type: "체크박스",
    text: "체크박스 질문입니다.",
    options: [
      { id: "1", text: "선택지 1" },
      { id: "2", text: "선택지 2" },
      { id: "3", text: "선택지 3" },
    ],
    isRequired: false,
    hasOtherOption: false,
  },
  {
    id: "5",
    type: "드롭다운",
    text: "드롭다운 질문입니다.",
    options: [
      { id: "1", text: "선택지 1" },
      { id: "2", text: "선택지 2" },
      { id: "3", text: "선택지 3" },
    ],
    isRequired: true,
    hasOtherOption: false,
  },
];
