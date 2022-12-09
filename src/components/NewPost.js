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
  <div class="grid h-screen place-items-center">
  <div className=" w-full max-w-xs">
    <form onSubmit={handleSubmit}>

      <label className="label"><span className="label-text">Image URL</span></label>

        <input 
        type="text" 
        placeholder="Image URL" 
        className="input input-bordered w-full max-w-xs"
        value={post.image_url} 
        onChange={handleChange}
        name="image_url"/>

      <label className="label"><span className="label-text">Description</span></label>

        <input 
        type="text" 
        placeholder="Description" 
        className="input input-bordered w-full max-w-xs"
        name="description" 
        value={post.description} 
        onChange={handleChange}/>

      <button type="submit" className="btn btn-wide">POST</button>
      
    </form>
    <br></br>
    <br></br>
  </div>
</div>
  );
}
export default NewPost;
