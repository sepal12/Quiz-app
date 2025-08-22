import { useEffect } from "react";
import { preloadQuestions } from "/Utils/api.js"; // Fixed import path

  function App() {
  useEffect(() => {    preloadQuestions();
  }, []);

  // ... rest of your App component code
}

export default App;
