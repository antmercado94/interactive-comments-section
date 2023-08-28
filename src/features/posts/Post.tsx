import type { ReplyData, CommentData } from "posts/postsSlice";
import PostContextProvider from "posts/context/PostContext";
import PostView from "posts/views/PostView";

const Post = ({ comment }: { comment: CommentData | ReplyData }) => {
  const hasReplies = (comment as CommentData).replies?.length > 0;

  const getOrderedReplies = (post: CommentData) => {
    // ASC order by date
    const orderedReplies = post.replies
      .slice()
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

    return orderedReplies;
  };

  return (
    <section>
      <div className={hasReplies ? "flex flex-col gap-5" : ""}>
        <PostContextProvider comment={comment}>
          <PostView hasReplies={hasReplies} />
        </PostContextProvider>

        {/* nest replies within parent post */}
        {hasReplies && (
          <div className="relative flex flex-col gap-[1.5rem] pl-5 before:absolute before:left-0 before:h-[100%] before:w-[2.2px] before:bg-neutral-light-gray before:content-[''] sm:ml-[2.8rem] sm:pl-11 sm:before:h-[97%]">
            {getOrderedReplies(comment as CommentData).map((reply) => (
              <Post comment={reply} key={reply.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Post;
