import React, { useState } from "react";
import axios from "axios";
import bgImage from "../home.png";
function Login({ setUser }) {
   const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "http://localhost:5000/login" : "http://localhost:5000/signup";

    try {
      const res = await axios.post(url, form);
      if (isLogin) {
        setUser(res.data.user);
        alert("Logged in successfully!");
      } else {
        setUser({ username: form.username, email: form.email });
        alert(res.data.message || "Signup successful!");
      }
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      alert(err.response?.data?.message || (isLogin ? "Login failed" : "Signup failed"));
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
     style={{
    backgroundImage: `url(${bgImage})`,
  }}
    >
      <div className="min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 p-6 bg-white rounded shadow-md w-96"
        >
          <h1 className="text-xl font-bold text-center">{isLogin ? "Login" : "Signup"}</h1>
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">
            {isLogin ? "Login" : "Signup"}
          </button>
          <p
            className="text-center text-sm text-blue-600 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
