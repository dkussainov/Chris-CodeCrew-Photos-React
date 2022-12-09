import Comment from "./Comment";

import { useState, useEffect } from "react";

function PostCard({ post, deletePost, descriptionAfterUpdate, user }) {
  const [text, setText] = useState("");
  const [postComments, setPostComments] = useState(post.comments);
  const [showEditForm, setShowEditForm] = useState(false);
  const [updateForm, setUpdateForm] = useState("");


  // Set All Likes
  const [likes, setLikes] = useState(post.likes);
  console.log("likes: ", likes);
  // Set Like Button
  const [isLiked, setIsLiked] = useState(false);
  console.log("like: ", isLiked);
  // Set Current Like
  const [currentLike, setCurrentLike] = useState({});
  console.log("currentLike: ", currentLike);
  // Set Likes Count
  const [likesCount, setLikesCount] = useState(post.likes.length);
  console.log("likesCount: ", likesCount);

  

  // Fetch All Likes
  useEffect(()=>{
    fetch(`/posts/${post.id}`)
    .then(r => r.json())
    .then(post => {
      setCurrentLike(post.likes.find(like => like.post_id === post.id))
      
      // is this post already liked from the user?
      console.log("isLiked: ", isLiked);
      
      if (post.likes.find(like => like.user_id === user.id)) {
        setIsLiked(true);
      }
      }
    )
  },[])

  // if(currentLike.length > 0) {
  //   setIsLiked(true)
  // } else
  // setIsLiked(false)


  // Post Like

  function handleLike(e) {
    e.preventDefault();
    fetch(`/posts/${post.id}/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: post.id,
        user_id: user.id,
      }),
    })
      .then((r) => r.json())
      .then((like) => {
        setCurrentLike(like);
      });
    setIsLiked(true);
    setLikesCount(likesCount + 1);
  }


  // Delete Like
  function handleDeleteLike(e) {
    e.preventDefault();
    fetch(`/likes/${currentLike.id}`, {
      method: "DELETE",
    })
    setIsLiked(false);
    setLikesCount(likesCount - 1);
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
            <div className="cardbtns">
              {!isLiked ? (
                <button onClick={handleLike}>
                  <span class="material-symbols-outlined">&#9825;</span>
                </button>
              ) : (
                <button onClick={handleDeleteLike}>
                  <span class="material-symbols-outlined">&#9829;</span>
                </button>
              )}
            

              <button onClick={handleDeletePost}>
                <span class="material-symbols-outlined">delete</span>
              </button>
            </div>
            <h4>Likes:{likesCount}</h4>

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
