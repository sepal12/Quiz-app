export default function Navbar({ setView }) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1
          className="text-2xl font-bold text-primary cursor-pointer"
          onClick={() => setView("dashboard")}
        >
          Quiz App
        </h1>
        <p className="text-gray-600">
          Challenge yourself with quizzes on various topics
        </p>
      </div>
    </nav>
  );
}
