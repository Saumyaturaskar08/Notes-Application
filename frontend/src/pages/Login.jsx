import { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function Login({ setPage }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/login`, {
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setPage("notebook");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      alert("Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">

      <div className="bg-white shadow-2xl rounded-3xl p-8 w-[350px]">

        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
          📒 My Notebook
        </h1>

        <form onSubmit={login} className="space-y-4">

          <input
            type="email"
            placeholder="Enter email"
            className="w-full p-3 rounded-xl border-2 border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter password"
            className="w-full p-3 rounded-xl border-2 border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-xl shadow-lg transition transform hover:scale-105">
            Login 💕
          </button>

        </form>

        <p
          className="text-center mt-5 text-blue-500 cursor-pointer"
          onClick={() => setPage("register")}
        >
          Create new account
        </p>

      </div>

    </div>
  );
}