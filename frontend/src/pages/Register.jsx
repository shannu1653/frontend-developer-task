import { useState } from "react";
import api from "../api/axios";
import "./login.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔐 Live Password Validation
  const validatePassword = (value) => {
    if (value.length < 8) {
      return "Password must be at least 8 characters.";
    }
    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least 1 uppercase letter.";
    }
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(value)) {
      return "Password must contain at least 1 special character.";
    }
    return "";
  };

  const register = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await api.post("accounts/register/", {
        email,
        password,
      });

      setSuccess("Registered successfully! Redirecting...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (err) {
      if (err.response?.data?.email) {
        setError(err.response.data.email[0]);
      } else if (err.response?.data?.password) {
        setError(err.response.data.password[0]);
      } else {
        setError("Registration failed. Try again.");
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={register}>

        <h2>Create Account</h2>
        <p>Register to continue</p>

        {/* Error Message */}
        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="success-box">
            {success}
          </div>
        )}

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(validatePassword(e.target.value));
          }}
          required
        />

        {/* Password Hint */}
        <small className="password-hint">
          Must contain 8+ characters, 1 capital letter & 1 special character.
        </small>

        <button>Create Account</button>

        <div
          className="switch"
          onClick={() => (window.location.href = "/login")}
        >
          Already have account? Login
        </div>

      </form>
    </div>
  );
}
