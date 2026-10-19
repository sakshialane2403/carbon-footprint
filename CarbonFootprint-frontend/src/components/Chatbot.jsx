import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";
import "../css/Chatbot.css";

export default function Chatbot() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const audience = user ? "USER" : "GUEST";
    api.get("/chatbot/faqs", { params: { audience } })
      .then((r) => setFaqs(Array.isArray(r.data) ? r.data : []))
      .catch(() => setFaqs([]));
    setActive(null);
  }, [user, open]);

  return (
    <div className="ct-chatbot">
      {open && (
        <div className="ct-chat-panel">
          <div className="ct-chat-head">
            <div>
              <strong>Need help?</strong>
              <small>{user ? "Tracking & dashboard" : "Register & login"}</small>
            </div>
            <button type="button" aria-label="Close chat" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="ct-chat-qs">
            {faqs.map((f) => (
              <button key={f.faqId} type="button" className={active?.faqId === f.faqId ? "on" : ""} onClick={() => setActive(f)}>
                {f.question}
              </button>
            ))}
          </div>
          {active && <div className="ct-chat-ans">{active.answer}</div>}
        </div>
      )}
      <button type="button" className="ct-chat-fab" aria-label="Open help" onClick={() => setOpen((v) => !v)}>
        {open ? "×" : "💬"}
      </button>
    </div>
  );
}
