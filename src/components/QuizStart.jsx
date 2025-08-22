import { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import ScoreSummary from "./ScoreSummary";
import { fetchQuizQuestions } from "";

export default function QuizStart({ quizData, endQuiz, goBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState("loading"); // 'loading', 'success', 'fallback'
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        setApiStatus("loading");

        const questions = await fetchQuizQuestions(
          quizData.categoryId,
          quizData.questionCount,
          quizData.difficulty
        );

        setQuestions(questions);
        setApiStatus("success");

        // Check if we're using fallback (no API response structure)
        if (!questions[0]?.incorrect_answers) {
          setApiStatus("fallback");
        }
      } catch (error) {
        console.error("Failed to load questions:", error);
        setApiStatus("fallback");
        // State is already set to fallback questions from api.js
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, [quizData]);

  const handleAnswer = (answer) => {
    if (!questions[currentIndex]) return;

    const isCorrect = answer === questions[currentIndex].correct_answer;
    const newScore = isCorrect ? score + 1 : score;

    const newUserAnswers = [
      ...userAnswers,
      {
        question: questions[currentIndex].question,
        userAnswer: answer,
        correctAnswer: questions[currentIndex].correct_answer,
        isCorrect,
      },
    ];

    setUserAnswers(newUserAnswers);
    setScore(newScore);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizCompleted(true);
      if (endQuiz) {
        endQuiz(
          newScore,
          questions.length,
          quizData?.categoryName || "General Knowledge",
          quizData?.difficulty || "medium"
        );
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading questions from API...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <ScoreSummary
        score={score}
        total={questions.length}
        userAnswers={userAnswers}
        onRestart={() => {
          setCurrentIndex(0);
          setScore(0);
          setUserAnswers([]);
          setQuizCompleted(false);
        }}
        onNewQuiz={goBack}
      />
    );
  }

  if (questions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">No Questions Available</h3>
          <p className="text-gray-600 mb-4">
            Please try a different category or difficulty.
          </p>
          <button
            onClick={goBack}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            Choose Another Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* API Status Indicator */}
      {apiStatus === "fallback" && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded mb-4">
          ⚠️ Using offline mode (API unavailable)
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {quizData?.categoryName || "General Knowledge"} Quiz (
          {quizData?.difficulty || "mixed"})
        </h2>
        <div className="bg-gray-100 px-3 py-1 rounded-full">
          Question {currentIndex + 1}/{questions.length}
        </div>
      </div>

      <QuestionCard
        question={questions[currentIndex]}
        onAnswer={handleAnswer}
      />

      <button
        className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        onClick={goBack}
      >
        Quit Quiz
      </button>
    </div>
  );
}
