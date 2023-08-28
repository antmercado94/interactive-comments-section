import { useContext } from "react";
import { PostContext } from "posts/context/PostContext";
import { CommentData, ReplyData } from "posts/postsSlice";
import Avatar from "posts/views/post/Avatar";
import TimeAgo from "posts/views/post/TimeAgo";
import Modifications from "posts/views/post/Modifications";

const UserContent = () => {
  const { postData, isUser } = useContext(PostContext);
  const {
    user: {
      username,
      image: { base64: img },
    },
    createdAt,
  } = postData as CommentData | ReplyData;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* avatar */}
          <div className="block flex-shrink-0">
            <Avatar src={img} alt={username} />
          </div>
          <div className="flex items-center gap-2">
            {/* username */}
            <span className="font-medium text-neutral-dark-blue">
              {username}
            </span>
            {/* current user */}
            {isUser && (
              <span className="rounded-sm bg-primary-moderate-blue px-[.45rem] pb-[0.3rem] pt-[0.2rem] text-sm font-medium leading-none text-neutral-white">
                you
              </span>
            )}
          </div>
        </div>
        {/* date */}
        <TimeAgo timestamp={createdAt} />
      </div>
      {/* desktop delete/edit/reply */}
      <div className="hidden sm:flex">
        <Modifications />
      </div>
    </div>
  );
};

export default UserContent;
