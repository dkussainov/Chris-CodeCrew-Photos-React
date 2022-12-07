function Comment({ comment, post, updateComments }) {

    function handleDeleteComment(){
        fetch(`posts/${post.id}/comments/${comment.id}`, {
      method: 'DELETE'
        }).then(updateComments(comment.id))
    }


  return (
    <div>
    <div className="avatar online">
    <div className="w-10 rounded-full">
      <img
        src={comment.commented_user.avatar}
        alt={comment.commented_user.username}
        width="50"
        height="50"
      />
      </div>
      </div>
      <div>
      <h4>{comment.commented_user.username}</h4>
      <button className="deletecomment" onClick={handleDeleteComment} ><span class="material-symbols-outlined">delete</span></button>
      <p>{comment.text}</p>
    </div>
    </div>
  );
}

export default Comment;
