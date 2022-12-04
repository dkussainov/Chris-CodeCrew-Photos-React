import { useState } from "react";
import {useNavigate} from "react-router-dom";

function LoginForm({setUser}) {

    const navigate = useNavigate()

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  console.log("Errors:", errors);

  console.log("loginForm:", form);

  function handleChange(e) {
    const value = e.target.value;
    const keyName = e.target.name;
    setForm({ ...form, [keyName]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.username,
        password: form.password,
      }),
    }).then((r) => {
      if (r.ok) {
          r.json().then((currentUser) => setUser(currentUser));
          navigate("/")
        } else {
            r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="text"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit">Log In</button>
      </form>
      <div>{errors.map((e) => `${e}. `)}</div>
    </div>
  );
}

export default LoginForm;
