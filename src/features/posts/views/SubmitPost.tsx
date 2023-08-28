import { Ref, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "user/userSlice";
import { addPost, addReplyPost } from "posts/postsSlice";
import { PostContext } from "posts/context/PostContext";
import Avatar from "posts/views/post/Avatar";
import Textarea from "~/components/ui/Textarea";
import Button from "~/components/ui/Button";

type Props = {
  type: "reply" | "edit" | "send";
  postId?: number;
};

const SubmitPost = ({ type, postId }: Props) => {
  const { toggleReply, handlePostReply, postTextareaRef } =
    useContext(PostContext);

  const [postContent, setPostContent] = useState<string>("");

  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);

  const {
    username,
    image: { base64: userAvatar },
  } = currentUser;

  // submit post or reply
  const handleAddPost = (parentPostId?: number) => {
    if (!postContent) return;

    if (type !== "reply") {
      dispatch(addPost(currentUser, postContent));
      setPostContent("");
      return;
    }

    if (!parentPostId) return;
    // dispatch reply
    dispatch(addReplyPost(currentUser, postContent, parentPostId));
    toggleReply && handlePostReply();
  };

  return (
    <section>
      <div className="flex flex-col gap-4 rounded-lg bg-white p-4 sm:gap-5 sm:p-6">
        <div className="sm:flex sm:gap-4">
          {/* desktop avatar */}
          <div className="hidden flex-shrink-0 sm:block">
            <Avatar size={"lg"} src={userAvatar} alt={username} />
          </div>
          <Textarea
            className="h-24"
            ref={postTextareaRef as Ref<HTMLTextAreaElement>}
            placeholder="Add a comment..."
            onChange={(e) => setPostContent(e.target.value)}
            value={postContent}
          ></Textarea>
          {/* desktop btn */}
          <div className="hidden sm:block">
            <Button onClick={() => handleAddPost(postId)}>{type}</Button>
          </div>
        </div>

        {/* mobile avatar and btn */}
        <div className="flex flex-wrap items-center justify-between sm:hidden">
          <div className="block flex-shrink-0">
            <Avatar src={userAvatar} alt={username} />
          </div>
          <Button onClick={() => handleAddPost(postId)}>{type}</Button>
        </div>
      </div>
    </section>
  );
};

export default SubmitPost;
