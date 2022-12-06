import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom";

function ProfileCard({ user, posts, deletePost, descriptionAfterUpdate }) {
  const user_posts = posts.map((post) => {
    return <PostCard descriptionAfterUpdate={descriptionAfterUpdate} deletePost={deletePost} key={post.id} post={post} />;
  });

  const navigate = useNavigate();
  function handleNewPostClick() {
    navigate("/newpost");
  }

  return (
    <>
    <div>
    <img width="150" height="150" src={user.avatar} alt={user.username} />
    <p>{user.bio}</p>
    <h3>Posts</h3>
        <button onClick={handleNewPostClick}>New Post</button>
        {user_posts}
    </div>
    

</>
  );
}

export default ProfileCard;
