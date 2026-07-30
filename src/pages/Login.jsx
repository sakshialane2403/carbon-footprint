import "../css/Login.css";
import loginImg from "../assets/login.png";
import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="login">

      <div className="login-left">

        <img src={loginImg} alt="login"/>

      </div>

      <div className="login-right">

        <h2>Welcome Back 👋</h2>

        <p>
          Login to continue tracking your carbon footprint.
        </p>

        <form>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
          />

          <div className="login-options">

            <label>

              <input type="checkbox"/>

              Remember Me

            </label>

            <a href="#">Forgot Password?</a>

          </div>

          <button>

            Login

          </button>

        </form>

        <p className="register-text">

          Don't have an account?

          <Link to="/register">

            Register

          </Link>

        </p>

      </div>

    </section>
  );
}

export default Login;