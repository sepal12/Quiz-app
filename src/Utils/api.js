export async function fetchQuizQuestions(categoryId, amount, difficulty) {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    const data = await response.json();
    if (data.response_code !== 0) {
      throw new Error("No results found for this category/difficulty");
    }

    return data.results;
  } catch (error) {
    throw new Error(error.message);
  }
}
