import { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { CommentData, ReplyData, changeScore } from "posts/postsSlice";
import { PostContext } from "posts/context/PostContext";
import Icons from "~/components/Icons";

const ScoreBtn = styled.button`
  &.voted,
  &:hover {
    svg path {
      fill: var(--primary-moderate-blue);
    }
  }
`;

const Score = () => {
  const { postData } = useContext(PostContext);
  const { id, score = 0 } = postData as CommentData | ReplyData;

  const [currentVote, setCurrentVote] = useState<"ADD" | "SUBTRACT" | null>(
    null,
  );
  const [currentScore, setCurrentScore] = useState<number>(score);

  const dispatch = useDispatch();

  // increment/decrement post vote by 1
  const setPostVote = (postId: number, method: "ADD" | "SUBTRACT") => {
    if (currentVote === method) return;

    setCurrentScore(method === "ADD" ? score + 1 : score - 1);
    dispatch(changeScore({ postId, method, override: !!currentVote }));
    setCurrentVote(method);
  };

  return (
    <div className="flex gap-3 rounded-lg bg-neutral-very-light-gray px-3 py-2 sm:flex-col sm:items-center sm:gap-4 sm:px-2 sm:pb-[0.95rem] sm:pt-[0.75rem]">
      <ScoreBtn
        aria-label="Add"
        onClick={() => setPostVote(id, "ADD")}
        className={currentVote === "ADD" ? "voted" : ""}
      >
        <Icons.Plus />
      </ScoreBtn>
      <span className="min-w-[1.5rem] text-center font-medium text-primary-moderate-blue">
        {currentScore}
      </span>
      <ScoreBtn
        aria-label="Subtract"
        onClick={() => setPostVote(id, "SUBTRACT")}
        className={currentVote === "SUBTRACT" ? "voted" : ""}
      >
        <Icons.Minus />
      </ScoreBtn>
    </div>
  );
};

export default Score;
