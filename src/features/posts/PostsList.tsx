import { useSelector } from "react-redux";
import { selectAllPosts } from "posts/postsSlice";
import Post from "posts/Post";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);

  // DESC order by score
  const orderedPosts = posts.slice().sort((a, b) => b.score - a.score);

  return orderedPosts.map((post) => <Post comment={post} key={post.id} />);
};

export default PostsList;
