import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api.js";

export default function Articles() {
  const { id } = useParams();
  const [list, setList] = useState([]);
  const [one, setOne] = useState(null);

  useEffect(() => {
    if (id) {
      api.get(`/articles/${id}`).then((r) => setOne(r.data)).catch(() => setOne(null));
    } else {
      api.get("/articles").then((r) => setList(r.data || [])).catch(() => setList([]));
      setOne(null);
    }
  }, [id]);

  if (one) {
    return (
      <article className="pro-article">
        <Link to="/articles" className="pro-back">← All articles</Link>
        <h2>{one.title}</h2>
        <p className="pro-lead">{one.summary}</p>
        <p>{one.content}</p>
      </article>
    );
  }

  return (
    <div className="articles-page">
      <div className="articles-page-head">
        <h1>Articles</h1>
        <p>Sustainability tips and carbon-reduction reads.</p>
      </div>
      <div className="pro-article-grid">
        {list.map((a) => (
          <Link key={a.articleId} to={`/articles/${a.articleId}`} className="pro-article-card">
            <span>Article</span>
            <h3>{a.title}</h3>
            <p>{a.summary}</p>
          </Link>
        ))}
        {!list.length && <p className="pro-muted">No published articles yet.</p>}
      </div>
    </div>
  );
}
