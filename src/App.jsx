import { useEffect } from "react";
import { preloadQuestions } from "./Utils/api.js"; // Fixed import path
import QuizStart from "./components/QuizStart";

function App() {
  useEffect(() => {
    preloadQuestions();
  }, []);

  // Example quizData object
  const quizData = {
    categoryId: 9,
    categoryName: "General Knowledge",
    questionCount: 5,
    difficulty: "easy",
  };

  return (
    <div style={{ color: "red" }}>
      React is working!
      {/* <QuizStart quizData={quizData} endQuiz={() => {}} goBack={() => {}} /> */}
    </div>
  );
}

export default App;
