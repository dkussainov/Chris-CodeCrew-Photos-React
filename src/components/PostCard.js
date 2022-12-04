import Comment from "./Comment";
import { useState } from "react";

function PostCard({ post, deletePost }) {
  const [text, setText] = useState("");
  const [postComments, setPostComments] = useState(post.comments)

  console.log("comments:", postComments)



  function addComment(newComment) {
    setPostComments([...postComments, newComment]);
  }

  function updateComments(deletedComment) {
    const commentsAfterDelete = postComments.filter((comment) => comment.id !== deletedComment);
    setPostComments(commentsAfterDelete);
  }

  const commentsList = postComments.map((comment) => {
    return <Comment key={comment.id} comment={comment} post={post} updateComments={updateComments}/>;
  });

  function handleDeletePost() {
    fetch(`/posts/${post.id}`, {
      method: "DELETE",
    }).then(deletePost(post.id));
  }



  function handleSubmitComment(e) {
    e.preventDefault();
    fetch(`/posts/${post.id}/comments`, {
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

  return (
    <div>
      <img
        src={post.image_url}
        alt={post.description}
        width="450"
        height="500"
      />
      <h4>{post.likes.map((like) => like.likes_num)}</h4>
      <p>{post.description}</p>
      <button>Like</button>
      <button onClick={handleDeletePost}>Delete Post</button>
      <h4>Comments</h4>
      {commentsList}
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

export default PostCard;
