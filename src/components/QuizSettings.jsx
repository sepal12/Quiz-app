import { useState } from "react";

export default function QuizSettings({ category, startQuiz, onBack }) {
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState("medium");

  const handleStart = () => {
    startQuiz({
      categoryId: category.id,
      categoryName: category.name,
      questionCount,
      difficulty,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">
        Quiz Settings for {category.name}
      </h3>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Number of Questions</label>
        <select
          className="w-full p-2 border rounded"
          value={questionCount}
          onChange={(e) => setQuestionCount(parseInt(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Difficulty</label>
        <div className="flex gap-4">
          {["easy", "medium", "hard"].map((level) => (
            <label key={level} className="flex items-center">
              <input
                type="radio"
                className="mr-2"
                checked={difficulty === level}
                onChange={() => setDifficulty(level)}
              />
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          onClick={onBack}
        >
          Back to Categories
        </button>
        <button
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          onClick={handleStart}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
