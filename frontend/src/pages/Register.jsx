// import { useState } from "react";
// import axios from "axios";

// const API = "http://localhost:5000/api";

// export default function Register({ setPage }) {

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const register = async (e) => {
//     e.preventDefault();

//     await axios.post(`${API}/register`, {
//       name,
//       email,
//       password,
//     });

//     alert("Registered");
//     setPage("login");
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-yellow-50">

//       <form className="bg-white p-6 shadow-xl rounded-xl w-80">

//         <h2 className="text-2xl mb-4 text-center">
//           Register
//         </h2>

//         <input
//           placeholder="Name"
//           className="w-full p-2 border mb-3"
//           onChange={(e) => setName(e.target.value)}
//         />

//         <input
//           placeholder="Email"
//           className="w-full p-2 border mb-3"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           placeholder="Password"
//           type="password"
//           className="w-full p-2 border mb-3"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           onClick={register}
//           className="bg-yellow-500 text-white w-full p-2"
//         >
//           Register
//         </button>

//         <p
//           className="text-center mt-3 text-blue-500 cursor-pointer"
//           onClick={() => setPage("login")}
//         >
//           Back to Login
//         </p>

//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function Register({ setPage }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const register = async (e) => {
    e.preventDefault();

    try {

      await axios.post(`${API}/register`, {
        name,
        email,
        password,
      });

      alert("Registered Successfully");

      setPage("login");

    } catch (err) {
      alert("Error");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200">


      <div className="bg-white shadow-2xl rounded-3xl p-8 w-[350px]">


        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
          📒 Create Account
        </h1>


        <form onSubmit={register} className="space-y-4">


          <input
            type="text"
            placeholder="Enter name"
            className="w-full p-3 rounded-xl border-2 border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={(e) => setName(e.target.value)}
          />


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
            Register 💕
          </button>


        </form>


        <p
          className="text-center mt-5 text-blue-500 cursor-pointer"
          onClick={() => setPage("login")}
        >
          Already have account? Login
        </p>


      </div>


    </div>
  );
}