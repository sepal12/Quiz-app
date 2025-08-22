// Clear old cache entries
export function cleanQuizCache() {
  const now = Date.now();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("quiz-")) {
      try {
        const data = JSON.parse(localStorage.getItem(key));
        if (data.timestamp && now - data.timestamp > oneWeek) {
          localStorage.removeItem(key);
        }
      } catch {
        localStorage.removeItem(key);
      }
    }
  }
}

// Run cleanup on app start
cleanQuizCache();
