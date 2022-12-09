import { useState , useEffect} from "react";
import HomePostComment from "./HomePostComment";

function HomePostCard({ post }) {
  const [text, setText] = useState("");
  const [postComments, setPostComments] = useState(post.comments);
  const [like, setLike] = useState(true)
  console.log("like: ", like)

  

  function addComment(newComment) {
    setPostComments([...postComments, newComment]);
  }


  function handleSubmitComment(e) {
    e.preventDefault();
    fetch(`/posts/${post.id}/allcomments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      }),
    })
      .then((r) => r.json())
      .then((newComment) => addComment(newComment));
  }



  const commentList = postComments.map((comment) => (
    <HomePostComment key={comment.id} comment={comment} />
  ));

  return (
    <div>
      <div className="flex flex-col w-full">
        <div className="grid h-flex card bg-base-000 rounded-box place-items-center">
          <div className="card w-96 bg-base-100 shadow-xl">

          

            <figure>      
              <img
                  src={post.image_url}
                  alt={post.description}
                  width="450"
                  height="500"
                />
            </figure>

          <div className="card-body">

            <div className="card-buttons">
              {like ? (

                <button onClick={() => setLike(false)}>
                  <span class="material-symbols-outlined">&#9825;</span>
                </button>
              )
                : ( 
                  <button onClick={() => setLike(true)}>
                  <span class="material-symbols-outlined">&#9829;</span>
                </button>
                )}

            </div>
            <h4>Likes: </h4>


          <h1 className="card-title">
            {post.description}
          </h1>
          {/* <p>{post.description}</p> */}
          <h3>Comments</h3>
          {commentList}

          <div>
          <form onSubmit={handleSubmitComment}>
            <input
              name="comment"
              placeholder="Add a comment"
              className="input input-bordered input-xs w-full max-w-xs"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          <button type="submit" className="btn">Comment</button>
          </form>
    </div>
  </div>
</div>
  </div> 
  <br></br><br></br>
</div> 
</div>


  );
}

export default HomePostCard;
