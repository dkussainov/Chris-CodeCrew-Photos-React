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
      <ul>
      <h4><strong>{comment.commented_user.username}</strong></h4>
        <p> {comment.text}</p>
        </ul>
      </div>
      <div>

      </div>
    </div>
  );
}

export default HomePostComment;
