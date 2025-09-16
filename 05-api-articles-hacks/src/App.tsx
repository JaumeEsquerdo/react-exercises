import { useTopArticles } from "./hooks/useTopArticles"
import type { HackerNewsItem } from "./types/HackerNewsItem";


function App() {
  const { data, isLoading, isError } = useTopArticles();


  if (isLoading) return <p>Loading top articles...</p>;
  if (isError) return <p>Something went wrong 😢</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔥 Top 10 Hacker News Articles</h1>
      <ul>
        {data?.map((article: HackerNewsItem) => (
          <li key={article.id} style={{ marginBottom: "15px" }}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <p>
              by <b>{article.by}</b> | score: {article.score}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default App
