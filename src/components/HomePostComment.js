function HomePostComment({ comment }) {
  return (
    <div>
      <img
        src={comment.commented_user.avatar}
        alt={comment.commented_user.username}
        width="50"
        height="50"
      />
      <h4>{comment.commented_user.username}</h4>
      <p>{comment.text}</p>
    </div>
  );
}

export default HomePostComment;
