import { useState } from "react";
import {useNavigate } from "react-router-dom";

function NewPost() {
  const [post, setPost] = useState({
    image_url: "",
    description: "",
  });
  console.log("postForm:", post);

  function handleChange(e) {
    const value = e.target.value;
    const keyName = e.target.name;
    setPost({ ...post, [keyName]: value });
  }

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        image_url: post.image_url,
        description: post.description,
      }),
    })
      .then((r) => r.json())
      .then(console.log);
      navigate("/profile")
  }

  return (
    
    <div>
      <form onSubmit={handleSubmit}>
        <label>Image link</label>
        <input
          type="text"
          name="image_url"
          value={post.image_url}
          onChange={handleChange}
        />

        <label>Description</label>
        <input
          type="text"
          name="description"
          value={post.description}
          onChange={handleChange}
        />

        <button type="submit>">Post</button>
      </form>
    </div>
  );
}
export default NewPost;
