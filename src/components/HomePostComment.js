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
      <h4>{comment.commented_user.username}: {comment.text}</h4>
      </div>
      <div>

      </div>
    </div>
  );
}

export default HomePostComment;
