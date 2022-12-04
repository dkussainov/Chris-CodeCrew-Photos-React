import { useEffect, useState } from "react";
import HomePostCard from "../components/HomePostCard";

function Home() {
  const [allposts, setAllposts] = useState([]);


  useEffect(() => {
    fetch("/allposts")
      .then((r) => r.json())
      .then(setAllposts);
  }, []);
  console.log("home posts:", allposts);

  const postList = allposts.map((post) => {
    return <HomePostCard post={post} key={post.id} />;
  });

  return <div>{postList}</div>;
}
export default Home;
