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
    <div>
          <div className="h-full flex flex-col w-full">
      <div className="grid h-flex card bg-base-000 rounded-box place-items-left">
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
        <h2 className="card-title">{user.username}</h2>
        <p>{user.bio}</p>
      
      <div className="card-actions justify-center">
    <button type="submit" className="btn" onClick={handleNewPostClick}>New Post</button>
    </div>
    </div>
    </div>

    </div> 
    </div> 

     <h4 className="posttitle">Posts</h4>
     
     <div className="postcontainer">
     {/* <div className="flex flex-col w-full"> */}
     {/* <div className="grid h-20 card bg-base-000 rounded-box place-items-center"> */}
    {/* <div className="card w-96 bg-base-100 shadow-xl"> */}

    {/* <div className="flex flex-col w-full lg:flex-row">
  <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center"> */}
          {user_posts}

          {/* </div> */}

          {/* </div>  */}
          {/* </div> */}
          {/* </div> */}
          </div>
          
</div>
// </div>




      
    
        
       
 

  );
}

export default ProfileCard;
