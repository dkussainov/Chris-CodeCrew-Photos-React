import { useEffect, useState } from "react";
import HomePostCard from "../components/HomePostCard";
import {useNavigate} from 'react-router-dom'
import Login from "./Login";

function Home({user}) {
  const [allposts, setAllposts] = useState([]);

  useEffect(() => {
  
      
      fetch("/allposts")
        .then((r) => r.json())
        .then(setAllposts);
    console.log("home posts:", allposts);


}, [user]);

const navigate = useNavigate()
// const postList = allposts.map((post) => {
//   return <HomePostCard post={post} key={post.id} />;
// });
let postList;
  if(user === null && allposts.length > 0) {
    setAllposts([]);
    navigate('/login');
    } else {
    postList = allposts.map((post) => {
        return <HomePostCard post={post} key={post.id} />;
      });
    }
  return <div>{postList}</div>;
}

export default Home;
