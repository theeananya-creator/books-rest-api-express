import { useEffect, useState } from "react";

const API_URL = "https://rickandmortyapi.com/api/character";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({ pages: 1, count: 0 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [search, status]);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ page });
    if (search.trim()) params.set("name", search.trim());
    if (status) params.set("status", status);

    // Debounce typing so we don't call the API on every keystroke
    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_URL}?${params}`, { signal: controller.signal });
        if (res.status === 404) {
          setCharacters([]);
          setInfo({ pages: 1, count: 0 });
          return;
        }
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const data = await res.json();
        setCharacters(data.results);
        setInfo(data.info);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [page, search, status]);

  return (
    <main className="app">
      <h1>Rick & Morty Explorer</h1>
      <p className="subtitle">Data from the public Rick and Morty API</p>

      <div className="controls">
        <input
          type="search"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {error && <p className="message error">Something went wrong: {error}</p>}
      {loading && <p className="message">Loading...</p>}
      {!loading && !error && characters.length === 0 && (
        <p className="message">No characters found.</p>
      )}

      <section className="grid">
        {characters.map((c) => (
          <article className="card" key={c.id}>
            <img src={c.image} alt={c.name} loading="lazy" />
            <div className="card-body">
              <h2>{c.name}</h2>
              <p>
                <span className={`dot ${c.status.toLowerCase()}`} />
                {c.status} - {c.species}
              </p>
              <p className="muted">Last seen: {c.location.name}</p>
            </div>
          </article>
        ))}
      </section>

      {info.count > 0 && (
        <nav className="pagination">
          <button onClick={() => setPage((p) => p - 1)} disabled={page <= 1}>
            Previous
          </button>
          <span>
            Page {page} of {info.pages}
          </span>
          <button onClick={() => setPage((p) => p + 1)} disabled={page >= info.pages}>
            Next
          </button>
        </nav>
      )}
    </main>
  );
}
