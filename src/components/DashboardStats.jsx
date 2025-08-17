export default function DashboardStats({ quizHistory }) {
  const totalQuizzes = quizHistory.length;
  const avgScore =
    quizHistory.length > 0
      ? Math.round(
          quizHistory.reduce(
            (sum, quiz) => sum + (quiz.score / quiz.total) * 100,
            0
          ) / quizHistory.length
        )
      : 0;
  const bestScore =
    quizHistory.length > 0
      ? Math.max(
          ...quizHistory.map((quiz) =>
            Math.round((quiz.score / quiz.total) * 100)
          )
        )
      : 0;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Your Quiz Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500">Quizzes Taken</h3>
          <p className="text-3xl font-bold">{totalQuizzes}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500">Avg Score</h3>
          <p className="text-3xl font-bold">{avgScore}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500">Best Score</h3>
          <p className="text-3xl font-bold">{bestScore}%</p>
        </div>
      </div>
    </div>
  );
}
