import { useState } from "react";
import {useNavigate} from "react-router-dom"

function Signup({ user, setUser }) {
  const [form, setForm] = useState({
    username: "",
    avatar: "",
    password: "",
    passwordConfirmation: "",
  });

  const navigate = useNavigate()

  const [errors, setErrors] = useState([]);
  console.log("Errors:", errors);

  function handleChange(e) {
    const value = e.target.value;
    const keyName = e.target.name;
    setForm({ ...form, [keyName]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.username,
        avatar: form.avatar,
        password: form.password,
        password_confirmation: form.passwordConfirmation,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((newUser) => setUser(newUser));
        navigate("/profile")
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div>
      <h1>Signup</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />

          <label>Profile photo</label>
          <input
            type="text"
            name="avatar"
            value={form.avatar}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="text"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <label>Confirm password</label>
          <input
            type="text"
            name="passwordConfirmation"
            value={form.passwordConfirmation}
            onChange={handleChange}
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div>{errors.map((e) => `${e}. `)}</div>
    </div>
  );
}

export default Signup;
