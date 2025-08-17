import { useState } from "react";

export default function QuestionCard({ question, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer);
      setSelectedAnswer(null);
    }
  };

  // Combine incorrect and correct answers and shuffle them
  const allAnswers = [
    ...question.incorrect_answers,
    question.correct_answer,
  ].sort(() => Math.random() - 0.5);

  return (
    <div>
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3
          className="text-lg font-medium"
          dangerouslySetInnerHTML={{ __html: question.question }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {allAnswers.map((answer, index) => (
          <button
            key={index}
            className={`p-3 border rounded-lg text-left ${
              selectedAnswer === answer
                ? "border-primary bg-primary-50"
                : "border-gray-200 hover:border-primary"
            }`}
            onClick={() => setSelectedAnswer(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>

      <button
        className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed"
        onClick={handleSubmit}
        disabled={!selectedAnswer}
      >
        {question.incorrect_answers.length + 1 ===
        allAnswers.indexOf(selectedAnswer) + 1
          ? "Submit Answer"
          : "Next Question"}
      </button>
    </div>
  );
}
