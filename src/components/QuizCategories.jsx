import { useState } from "react";
import CategoryCard from "./CategoryCard";
import QuizSettings from "./QuizSettings";

const categories = [
  { id: 9, name: "General Knowledge", count: 25 },
  { id: 17, name: "Science & Nature", count: 30 },
  { id: 23, name: "History", count: 20 },
  { id: 11, name: "Entertainment: Film", count: 15 },
  { id: 12, name: "Entertainment: Music", count: 20 },
];

export default function QuizCategories({ startQuiz }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowSettings(true);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Quiz Categories</h2>

      {!showSettings ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => handleCategorySelect(category)}
            />
          ))}
        </div>
      ) : (
        <QuizSettings
          category={selectedCategory}
          startQuiz={startQuiz}
          onBack={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
