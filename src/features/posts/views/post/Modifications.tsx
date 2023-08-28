import { useContext } from "react";
import { PostContext } from "posts/context/PostContext";
import { CommentData, ReplyData } from "posts/postsSlice";
import Icons from "~/components/Icons";
import Button from "~/components/ui/Button";

const Modifications = () => {
  const {
    postData,
    isUser,
    handlePostReply,
    handlePostEdit,
    handlePostDelete,
  } = useContext(PostContext);

  const { id } = postData as CommentData | ReplyData;

  return (
    <>
      {!isUser ? (
        <div>
          <Button
            variant={"ghostWithIcon"}
            size={null}
            className="text-primary-moderate-blue"
            onClick={handlePostReply}
            aria-label="Reply"
          >
            <Icons.Reply /> Reply
          </Button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Button
            variant={"ghostWithIcon"}
            size={null}
            className="text-primary-soft-red"
            onClick={() => handlePostDelete(id)}
            aria-label="Delete Confirm"
          >
            <Icons.Delete /> Delete
          </Button>
          <Button
            variant={"ghostWithIcon"}
            size={null}
            className="text-primary-moderate-blue"
            onClick={handlePostEdit}
            aria-label="Edit"
          >
            <Icons.Edit /> Edit
          </Button>
        </div>
      )}
    </>
  );
};

export default Modifications;
