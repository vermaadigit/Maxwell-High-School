import { AnimatePresence } from "framer-motion";
import LoginPage from "./pages/Login";

function App() {
  return (
    <AnimatePresence mode="wait">
      <LoginPage />
    </AnimatePresence>
  );
}

export default App;
