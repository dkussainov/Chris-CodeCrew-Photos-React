import Comment from "./Comment";
import { useState } from "react";

function PostCard({ post, deletePost, descriptionAfterUpdate }) {
  const [text, setText] = useState("");
  const [postComments, setPostComments] = useState(post.comments)
  const [showEditForm, setShowEditForm] = useState(false)
  const [updateForm, setUpdateForm] = useState("")

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

  function handlePostUpdate(e) {
    e.preventDefault()
    fetch(`/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: updateForm,
      }),
    })
    .then((r) => {
      if (r.ok){
        r.json().then((post) => descriptionAfterUpdate(post))
      }
      else {
        r.json().then((err) => console.log(err.errors))
      }
    })
  }
console.log("updateForm:", updateForm)

  return (
  <div>
    <div className = "h-56 grid grid-cols-3 gap-4 content-center">
    <div className="card w-96 bg-base-100 shadow-xl">
    
    <figure>
      <img src={post.image_url}
        alt={post.description}
        width="450"
        height="500"
      />
    </figure>


    <div className="card-body">

    <h4>{post.likes.map((like) => like.likes_num)}</h4>

    <div className="cardbtns">
    <button><span class="material-symbols-outlined">favorite</span></button>
    <button onClick={handleDeletePost}><span class="material-symbols-outlined">delete</span></button>
    </div>

    <h2 className="card-title">{post.description}</h2>

    <div className="inputchange">
    {showEditForm ? (<form onSubmit={handlePostUpdate}>
        <input
        className="input input-bordered input-xs w-full max-w-xs"
        placeholder="Edit Caption"
        value={updateForm}
        onChange={e=>setUpdateForm(e.target.value)}></input>
        <button className="btn btn-xs" type="submit">Submit</button>
      </form>) : <></>}
      <button type="button" onClick={() => setShowEditForm(!showEditForm)}> 
        { showEditForm === true ? <span class="material-symbols-outlined"> close </span>  : <span class="material-symbols-outlined">edit_note</span>}
      </button>
      </div>
  

    <h4>Comments</h4>
      {commentsList}
      <form onSubmit={handleSubmitComment}>
        <input
          placeholder="comment" className="input input-bordered input-s w-full max-w-xs"
          name="comment"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn btn-secondary justify-right">Comment</button>
      </form>
    </div>

    </div>
    </div>
    </div>


  );
}

export default PostCard;
