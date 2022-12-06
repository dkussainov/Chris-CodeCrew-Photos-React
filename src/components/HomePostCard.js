import { useState , useEffect} from "react";
import HomePostComment from "./HomePostComment";

function HomePostCard({ post }) {
  const [text, setText] = useState("");
  const [postComments, setPostComments] = useState(post.comments);

  function addComment(newComment) {
    setPostComments([...postComments, newComment]);
  }


  function handleSubmitComment(e) {
    e.preventDefault();
    fetch(`/posts/${post.id}/allcomments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      }),
    })
      .then((r) => r.json())
      .then((newComment) => addComment(newComment));
  }

 

  const commentList = postComments.map((comment) => (
    <HomePostComment key={comment.id} comment={comment} />
  ));

  return (
    <div>
      <img
        src={post.image_url}
        alt={post.description}
        width="450"
        height="500"
      />
      <h4>{post.description}</h4>
      <button>Like</button>
      <h4>Comments</h4>
      {commentList}
      <form onSubmit={handleSubmitComment}>
        <input
          name="comment"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
}

export default HomePostCard;
