import { createBrowserRouter } from "react-router-dom";
import CreateSurveyPage from "./pages/CreateSurveyPage/CreateSurveyPage";
import App from "./App";
import PreviewPage from "./pages/PreviewPage/PreviewPage";

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
    ],
  },
]);
