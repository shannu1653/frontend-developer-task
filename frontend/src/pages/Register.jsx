import { useState } from "react";
import api from "../api/axios";
import "./login.css";

export default function Register() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const register = async(e)=>{
    e.preventDefault();

    await api.post("accounts/register/",{
      email,
      password
    });

    alert("Registered successfully! Login now.");
    window.location.href="/login";
  };

  return(
    <div className="auth-wrapper">

      <form className="auth-card" onSubmit={register}>

        <h2>Create Account</h2>
        <p>Register to continue</p>

        <input
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          required
        />

        <button>Create Account</button>

        <div
          className="switch"
          onClick={()=>window.location.href="/login"}
        >
          Already have account? Login
        </div>

      </form>

    </div>
  );
}
