export default function CategoryCard({ category, onClick }) {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
      <p className="text-gray-500">{category.count} questions available</p>
    </div>
  );
}
