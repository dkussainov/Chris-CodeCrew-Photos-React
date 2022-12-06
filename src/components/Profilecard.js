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
//     <>
//     <div>
//     <img width="150" height="150" src={user.avatar} alt={user.username} />
//     <p>{user.bio}</p>
//     <h3>Posts</h3>
//         <button onClick={handleNewPostClick}>New Post</button>
//         {user_posts}
//     </div>
// </>

<div>
<div className="flex flex-col w-full">
  <div className="grid h-flex card bg-base-000 rounded-box place-items-center">
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>      
      <div className="avatar online">
        <div className="w-24 rounded-full">
          <img
            src={user.avatar}
            alt={user.username}
            width="450"
            height="500"
          />
        </div>
      </div>
      </figure>
    <div className="card-body">
    <h2 className="card-title">{/* username */}</h2>
    <p>{user.bio}</p>
    <h4>Posts</h4>
    <ul>
      <li>{user_posts}</li>
    </ul>
   
  <div className="card-actions justify-left">
<button type="submit" className="btn" onClick={handleNewPostClick}>New Post</button>
</div>
</div>
</div>

</div> 
<div className="divider"></div> 
{/* <div className="grid h-20 card bg-base-300 rounded-box place-items-center">content</div> */}
</div>
</div>
  );
}

export default ProfileCard;
