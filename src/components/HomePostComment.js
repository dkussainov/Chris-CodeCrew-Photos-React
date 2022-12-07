function HomePostComment({ comment }) {
  return (
    <div>
      <div className="avatar">
      <div className="w-10 rounded-full">
      <img
        src={comment.commented_user.avatar}
        alt={comment.commented_user.username}
        width="20"
        height="20"
      />
      </div>
      &nbsp;
      &nbsp;
      <h4><strong>{comment.commented_user.username}: &nbsp;</strong></h4>
      <br></br>
        <h4> {comment.text}</h4>
      </div>
      <div>

      </div>
    </div>
  );
}

export default HomePostComment;
