import ProfileCard from "./Profilecard";
import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Profile({ user }) {
  const [posts, setPosts] = useState([]);
  console.log("posts:", posts);


  useEffect(() => {
    fetch("/posts")
      .then((r) => r.json())
      .then(setPosts);
  }, []);

  function updateAfterDelete(deletedPost) {
    const postsAfterDelete = posts.filter((post) => post.id !== deletedPost);
    setPosts(postsAfterDelete);
  }

  return (
    <div>
      {user ? (
        <div>
          <h2>{user.username}'s profile </h2>
        </div>
      ) : (
        <div>
          <h2>Login to use all features</h2>
        </div>
      )}
      <div>
        <ProfileCard user={user} posts={posts} deletePost={updateAfterDelete} />
      </div>
    </div>
  );
}

export default Profile;
