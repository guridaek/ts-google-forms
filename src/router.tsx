import { createBrowserRouter } from "react-router-dom";
import CreateSurveyPage from "./pages/CreateSurveyPage";
import App from "./App";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <CreateSurveyPage />,
      },
    ],
  },
]);
