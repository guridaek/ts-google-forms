import { Outlet } from "react-router-dom";
import { Container } from "./App.styled";

function App() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default App;
