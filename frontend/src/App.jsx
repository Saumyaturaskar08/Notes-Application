import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Notebook from "./pages/Notebook";

export default function App() {

  const [page, setPage] = useState("login");

  // check token on start
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setPage("notebook");
    } else {
      setPage("login");
    }
  }, []);


  if (page === "login") {
    return <Login setPage={setPage} />;
  }

  if (page === "register") {
    return <Register setPage={setPage} />;
  }

  if (page === "notebook") {
    return <Notebook setPage={setPage} />;
  }

}