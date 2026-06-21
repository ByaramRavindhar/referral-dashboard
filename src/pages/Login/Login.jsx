import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import api from "../../services/api";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/auth/signin", {
        email,
        password,
      });

      const token = response.data.data.token;

      Cookies.set("jwt_token", token);

      navigate("/");
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="brand-title">Go Business</h1>

        <p className="tagline">
          Sign in to open your referral dashboard.
        </p>

        <form onSubmit={handleLogin} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="text"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="signin-btn"
          >
            Sign in
          </button>

          {errorMsg && (
            <p className="error-text">
              {errorMsg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;