import { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import ScoreSummary from "./ScoreSummary";

// Fallback questions for when API fails
const FALLBACK_QUESTIONS = [
  {
    question: "What is the capital of France?",
    correct_answer: "Paris",
    incorrect_answers: ["London", "Berlin", "Madrid"],
  },
  {
    question: "Which planet is known as the Red Planet?",
    correct_answer: "Mars",
    incorrect_answers: ["Venus", "Jupiter", "Saturn"],
  },
  {
    question: "What is 2 + 2?",
    correct_answer: "4",
    incorrect_answers: ["3", "5", "6"],
  },
];

export default function QuizStart({ quizData, endQuiz, goBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Use fallback if no quizData (prevents immediate disappearance)
        if (!quizData) {
          setQuestions(FALLBACK_QUESTIONS);
          return;
        }

        // Try to get cached questions first
        const cacheKey = `quiz-${quizData.categoryId}-${quizData.difficulty}`;
        const cachedQuestions = localStorage.getItem(cacheKey);

        if (cachedQuestions) {
          setQuestions(JSON.parse(cachedQuestions));
          return;
        }

        // Add delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch(
          `https://opentdb.com/api.php?amount=${quizData.questionCount}&category=${quizData.categoryId}&difficulty=${quizData.difficulty}&type=multiple`
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        // Check if API actually returned questions
        if (!data.results || data.results.length === 0) {
          throw new Error("No questions received from API");
        }

        // Cache the questions for future use
        localStorage.setItem(cacheKey, JSON.stringify(data.results));
        setQuestions(data.results);
      } catch (err) {
        console.warn("API failed, using fallback:", err);
        setError(err.message);
        // Use fallback questions to prevent disappearance
        setQuestions(FALLBACK_QUESTIONS.slice(0, quizData?.questionCount || 3));
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [quizData]);

  const handleAnswer = (answer) => {
    // Safety check - ensure question exists
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

    // Move to next question or end quiz
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

  // Render loading state
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  // Render error state (but still show questions)
  if (error && questions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="text-red-600 mb-4">⚠️ {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Render quiz completed state
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

  // Main quiz interface - ONLY render if questions exist
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded mb-4">
          ⚠️ Using offline questions: {error}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {quizData?.categoryName || "General Knowledge"} Quiz (
          {quizData?.difficulty || "medium"})
        </h2>
        <div className="bg-gray-100 px-3 py-1 rounded-full">
          Question {currentIndex + 1}/{questions.length}
        </div>
      </div>

      {/* SAFETY CHECK: Only render if question exists */}
      {questions.length > 0 && questions[currentIndex] && (
        <QuestionCard
          question={questions[currentIndex]}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}
