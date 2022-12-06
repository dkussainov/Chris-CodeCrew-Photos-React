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
    <div className = "h-56 grid grid-cols-3 gap-4 content-center">
    <div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src={post.image_url}
    alt={post.description}
    width="450"
    height="500"/></figure>
  <div className="card-body">
    <div className="card-buttons">
        <button><span class="material-symbols-outlined">favorite</span></button>
        <button><span class="material-symbols-outlined">mode_comment</span></button>
        <buton><span class="material-symbols-outlined">bookmark</span></buton>
      </div>
    <h2 className="card-title">{post.description}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <button type="button" onClick={() => setShowEditForm(!showEditForm)}>
            {showEditForm === true ? <span class="material-symbols-outlined"> close </span>
              : <span class="material-symbols-outlined">edit_note</span>}
          </button>
          <button onClick={handleDeletePost}><span class="material-symbols-outlined">delete</span></button>
          <form onSubmit={handleSubmitComment}>
        <input
          name="comment"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      <button type="submit" className="btn btn-primary">Post</button>
      </form>
      </div>




    <div>
      {/* <div>
<img width="150" height="150" src={user.avatar} alt={user.username} />
<p>{user.bio}</p>
<h3>Posts</h3>
  <button onClick={handleNewPostClick}>New Post</button>
  {user_posts}
</div> */}



      
      <h4>{post.likes.map((like) => like.likes_num)}</h4>

    
      {showEditForm ? (<form onSubmit={handlePostUpdate}>
        <input
        value={updateForm}
        onChange={e=>setUpdateForm(e.target.value)}></input>
        <button type="submit">Submit</button>
      </form>) : <></>}
     
      {/* <h4>Comments</h4> */}
      {commentsList}
</div></div>

</div>

  );
}

export default PostCard;
