import { createBrowserRouter } from "react-router-dom";
import CreateSurveyPage from "./pages/CreateSurveyPage/CreateSurveyPage";
import App from "./App";
import PreviewPage from "./pages/PreviewPage/PreviewPage";
import ResultPage from "./pages/ResultPage/ResultPage";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <CreateSurveyPage />,
      },
      {
        path: "/preview",
        element: <PreviewPage />,
      },
      {
        path: "/result",
        element: <ResultPage />,
      },
    ],
  },
]);
