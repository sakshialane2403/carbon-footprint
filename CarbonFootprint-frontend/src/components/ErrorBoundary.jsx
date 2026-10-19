import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { err: null };
  }
  static getDerivedStateFromError(err) {
    return { err };
  }
  render() {
    if (!this.state.err) return this.props.children;
    return (
      <div style={{ padding: 40, fontFamily: "Poppins, sans-serif", color: "#14532d" }}>
        <h2>Something went wrong</h2>
        <p>{String(this.state.err.message || this.state.err)}</p>
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("cft_user");
            localStorage.removeItem("cft_token");
            window.location.href = "/login";
          }}
          style={{ padding: "10px 16px", background: "#16a34a", color: "#fff", border: 0, borderRadius: 10 }}
        >
          Back to login
        </button>
      </div>
    );
  }
}
