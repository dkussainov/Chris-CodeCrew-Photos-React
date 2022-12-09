import Comment from "./Comment";
import { useState, useEffect } from "react";

function PostCard({ post, deletePost, descriptionAfterUpdate }) {
  const [text, setText] = useState("");
  const [postComments, setPostComments] = useState(post.comments);
  const [showEditForm, setShowEditForm] = useState(false);
  const [updateForm, setUpdateForm] = useState("");
  const [like, setLike] = useState(true);
  const [currentLike, setCurrentLike] = useState({});


  console.log("comments:", postComments);

  useEffect(() => {
    fetch("/likes")
      .then((r) => r.json())
      .then((likes) => console.log(likes));
  });

  function handlelikePost(e) {
    e.preventDefault();
    fetch(`/posts/${post.id}/likes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ liked: like }),
    })
      .then((r) => r.json())
      .then((like) => setCurrentLike(like));
  }

  function handleUnlikePost(e) {
    e.preventDefault();
    fetch(`/posts/${post.id}/likes/${currentLike.id}`, {
      method: "DELETE",
    }).then(console.log);
  }

  function addComment(newComment) {
    setPostComments([...postComments, newComment]);
  }

  function updateComments(deletedComment) {
    const commentsAfterDelete = postComments.filter(
      (comment) => comment.id !== deletedComment
    );
    setPostComments(commentsAfterDelete);
  }

  const commentsList = postComments.map((comment) => {
    return (
      <Comment
        key={comment.id}
        comment={comment}
        post={post}
        updateComments={updateComments}
      />
    );
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

  function handlePostUpdate(e) {
    e.preventDefault();
    fetch(`/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: updateForm,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((post) => descriptionAfterUpdate(post));
      } else {
        r.json().then((err) => console.log(err.errors));
      }
    });
  }
  console.log("updateForm:", updateForm);

  return (
    <div>
      <br></br>
      <br></br>
      <div className="grid place-items-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src={post.image_url}
              alt={post.description}
              width="450"
              height="500"
            />
          </figure>

          <div className="card-body">
            {/* <h4>{likesCount.count}</h4> */}

            <div className="cardbtns">
              <div className="card-buttons">
              {like ? (
                <button
                  onClick={(e) => {
                    handlelikePost(e);
                    setLike(false);
                  }}
                > 
                ♡                
                </button>
              ) : (
                <button
                  className="filledheart" 
                  onClick={(e) => {
                    handleUnlikePost(e);
                    setLike(true);
                  }}
                >
                  ♥️
                </button>
              )}
              </div>

              <button onClick={handleDeletePost}>
                <span class="material-symbols-outlined">delete</span>
              </button>
            </div>

            <h2 className="card-title">{post.description}</h2>

            <div className="inputchange">
              {showEditForm ? (
                <form onSubmit={handlePostUpdate}>
                  <input
                    className="input input-bordered input-xs w-full max-w-xs"
                    placeholder="Edit Caption"
                    value={updateForm}
                    onChange={(e) => setUpdateForm(e.target.value)}
                  ></input>
                  <button className="btn btn-xs" type="submit">
                    Submit
                  </button>
                </form>
              ) : (
                <></>
              )}
              <button
                type="button"
                onClick={() => setShowEditForm(!showEditForm)}
              >
                {showEditForm === true ? (
                  <span class="material-symbols-outlined"> close </span>
                ) : (
                  <span class="material-symbols-outlined">edit_note</span>
                )}
              </button>
            </div>

            <h4>Comments</h4>
            {commentsList}
            <form onSubmit={handleSubmitComment}>
              <input
                placeholder="comment"
                className="input input-bordered input-s w-full max-w-xs"
                name="comment"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button type="submit" className="btn btn-secondary justify-right">
                Comment
              </button>
            </form>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
    </div>
  );
}

export default PostCard;
