// Local fallback questions
const FALLBACK_QUESTIONS = {
  9: [ // General Knowledge
    {
      question: "What is the capital of France?",
      correct_answer: "Paris",
      incorrect_answers: ["London", "Berlin", "Madrid"],
      difficulty: "easy"
    }
  ]
};

const API_ENDPOINTS = [
  'https://opentdb.com/api.php'
];

export async function fetchQuizQuestions(categoryId, amount, difficulty) {
  // Your API logic here
}

export async function preloadQuestions() {
  try {
    // Preload some questions
    await fetchQuizQuestions(9, 5, 'easy');
    await fetchQuizQuestions(9, 5, 'medium');
  } catch (error) {
    console.log('Preloading questions failed:', error);
  }
}