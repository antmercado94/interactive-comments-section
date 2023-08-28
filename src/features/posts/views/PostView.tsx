import { useContext, useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "user/userSlice";
import { CommentData, ReplyData } from "posts/postsSlice";
import { PostContext } from "posts/context/PostContext";
import SubmitPost from "posts/views/SubmitPost";
import Content from "posts/views/post/Content";
import UserContent from "posts/views/post/content/UserContent";
import TextContent from "posts/views/post/content/TextContent";

const PostView = ({ hasReplies }: { hasReplies: boolean }) => {
  const {
    postData,
    setTextContent,
    setIsUser,
    toggleReply,
    toggleEdit,
    postTextareaRef,
    editTextareaRef,
  } = useContext(PostContext);

  const currentUser = useSelector(selectCurrentUser);

  const {
    id,
    content,
    user: { username },
  } = postData as CommentData | ReplyData;

  useLayoutEffect(() => {
    setTextContent(content);
    setIsUser(username === currentUser.username);
  }, []);

  useEffect(() => {
    postTextareaRef?.current?.focus();
    if (postTextareaRef?.current)
      postTextareaRef.current.value = `@${username} `;
  }, [toggleReply]);

  useEffect(() => {
    const contentEl = editTextareaRef?.current;
    contentEl?.focus();
    // place cursor at end of textarea value
    contentEl?.setSelectionRange(
      contentEl.value.length,
      contentEl.value.length,
    );
  }, [toggleEdit]);

  return (
    <>
      <Content>
        <UserContent />
        <TextContent />
      </Content>
      {toggleReply && (
        <div className={hasReplies ? "-mt-3" : "mt-2"}>
          <SubmitPost type="reply" postId={id} />
        </div>
      )}
    </>
  );
};

export default PostView;
