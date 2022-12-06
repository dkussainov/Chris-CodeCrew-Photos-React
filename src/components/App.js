import React from "react";
import NavBar from "./NavBar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "./Profile";
import NewPost from "./NewPost";
import { useState, useEffect } from "react";
import Home from "../pages/Home";
import "../App.css";
import Footer from "./Footer";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  console.log("user:", user);

  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/user").then((r) => {
      if (r.ok) {
        r.json().then((currentUser) => setUser(currentUser));
      }
    });
  }, []);

  function handleClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        navigate("/");
      }
    });
  }

  return (
    <div className="App">
      <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">
      
    <div>
      {user ? (
        <div>
          <h4>Welcome, {user.username}</h4>
          </div>
      ) : (
        <h4>Welcome</h4>
      )}
        </div>

      </a>
  </div>
  <div className="flex-none">
    <button className="btn btn-square btn-ghost">
      
    {user ? (
        <div>
          <button onClick={handleClick}>Logout</button>
          </div>
      ) : (
        <button>Log In</button>
      )}
        
    </button>
  </div>
</div>

      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home/>} />

        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route
          path="/signup"
          element={<Signup user={user} setUser={setUser} />}
        />

        <Route
          path="/profile"
          element={<Profile user={user} setUser={setUser} />}
        />

        <Route
          path="/newpost"
          element={<NewPost user={user} setUser={setUser} />}
        />
      </Routes>
      <Footer />
    </div>
 
  );
}

export default App;
