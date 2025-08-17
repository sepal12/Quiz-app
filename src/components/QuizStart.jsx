import { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import ScoreSummary from "./ScoreSummary";

// Local fallback questions
const FALLBACK_QUESTIONS = [
  {
    question: "What is the capital of France?",
    correct_answer: "Paris",
    incorrect_answers: ["London", "Berlin", "Madrid"],
    category: "General Knowledge",
    difficulty: "easy"
  },
  {
    question: "Which planet is known as the Red Planet?",
    correct_answer: "Mars",
    incorrect_answers: ["Venus", "Jupiter", "Saturn"],
    category: "Science",
    difficulty: "easy"
  }
];

export default function QuizStart({ quizData, endQuiz, goBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 1. First try to use cached questions
        const cacheKey = `quiz-${quizData.categoryId}-${quizData.difficulty}`;
        const cached = localStorage.getItem(cacheKey);
        
        if (cached) {
          setQuestions(JSON.parse(cached));
          return;
        }

        // 2. Add artificial delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 3. Try API with fallback
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${quizData.questionCount}&category=${quizData.categoryId}&difficulty=${quizData.difficulty}&type=multiple`
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        
        if (!data.results?.length) {
          throw new Error("No questions returned");
        }

        // Cache the API response
        localStorage.setItem(cacheKey, JSON.stringify(data.results));
        setQuestions(data.results);

      } catch (err) {
        console.warn("Using fallback questions:", err);
        setError(err.message);
        setQuestions(FALLBACK_QUESTIONS.slice(0, quizData.questionCount));
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [quizData]);

  // ... (keep the rest of your component code unchanged)