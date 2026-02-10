import { useState } from "react";
import api from "../api/axios";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (register) {
        await api.post("accounts/register/", { email, password });
        alert("Registered successfully! Please login.");
        setRegister(false);
      } else {
        const res = await api.post("accounts/login/", { email, password });
        localStorage.setItem("token", res.data.access);
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("Invalid credentials or user already exists");
    }

    setLoading(false);
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={submit}>

        <h2>{register ? "Create Account" : "Welcome Back"}</h2>
        <p>{register ? "Register below" : "Login to dashboard"}</p>

        {error && <p style={{ color: "red", marginBottom: 10 }}>{error}</p>}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button disabled={loading}>
          {loading ? "Please wait..." : register ? "Register" : "Login"}
        </button>

        <div className="switch" onClick={() => setRegister(!register)}>
          {register ? "Already have account? Login" : "New user? Register"}
        </div>

      </form>
    </div>
  );
}
