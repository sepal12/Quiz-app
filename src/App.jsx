import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import QuizStart from "./components/QuizStart";
import QuizCategories from "./components/QuizCategories";
import QuizHistory from "./components/QuizHistory";
import DashboardStats from "./components/DashboardStats";

function App() {
  const [view, setView] = useState("dashboard");
  const [quizData, setQuizData] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);

  const startQuiz = (data) => {
    setQuizData(data);
    setView("quiz");
  };

  const endQuiz = (score, total, category, difficulty) => {
    const newHistory = [
      {
        date: new Date().toLocaleDateString(),
        category,
        difficulty,
        score,
        total,
      },
      ...quizHistory,
    ];
    setQuizHistory(newHistory);
    localStorage.setItem("quizHistory", JSON.stringify(newHistory));
    setView("dashboard");
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem("quizHistory");
    if (savedHistory) {
      setQuizHistory(JSON.parse(savedHistory));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar setView={setView} />

      <main className="container mx-auto px-4 py-8">
        {view === "dashboard" && (
          <>
            <DashboardStats quizHistory={quizHistory} />
            <QuizCategories startQuiz={startQuiz} />
            <QuizHistory quizHistory={quizHistory} />
          </>
        )}

        {view === "quiz" && quizData && (
          <QuizStart
            quizData={quizData}
            endQuiz={endQuiz}
            goBack={() => setView("dashboard")}
          />
        )}
      </main>
    </div>
  );
}

export default App;
