export default function ScoreSummary({
  score,
  total,
  userAnswers,
  onRestart,
  onNewQuiz,
}) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>

      <div className="mb-8 text-center">
        <div className="text-5xl font-bold mb-2">
          {score}/{total}
        </div>
        <div className="text-xl">
          {percentage >= 80
            ? "Excellent!"
            : percentage >= 60
            ? "Good Job!"
            : percentage >= 40
            ? "Not Bad!"
            : "Keep Practicing!"}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Question Review</h3>
        <div className="space-y-4">
          {userAnswers.map((item, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div
                className="font-medium mb-2"
                dangerouslySetInnerHTML={{ __html: item.question }}
              />
              <div
                className={`mb-1 ${
                  item.isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                Your answer:{" "}
                <span dangerouslySetInnerHTML={{ __html: item.userAnswer }} />
              </div>
              {!item.isCorrect && (
                <div className="text-green-600">
                  Correct answer:{" "}
                  <span
                    dangerouslySetInnerHTML={{ __html: item.correctAnswer }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          onClick={onNewQuiz}
        >
          Choose New Quiz
        </button>
        <button
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          onClick={onRestart}
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
}
