import { createSlice } from "@reduxjs/toolkit";
import { customAlphabet } from "nanoid";
import data from "data/data.json";

export type CommentData = (typeof initialState)[0];
export type ReplyData = CommentData["replies"][0];
export type User = {
  image: {
    base64: string;
  };
  username: string;
};

export const getLocalStorage = () => {
  try {
    const lsPosts = localStorage.getItem("posts");
    if (lsPosts === null) return undefined;

    return JSON.parse(lsPosts) as CommentData[];
  } catch (err) {
    return undefined;
  }
};

export const setLocalStorage = (state: CommentData[]) => {
  try {
    const serialPosts = JSON.stringify(state);
    localStorage.setItem("posts", serialPosts);
  } catch (err) {
    console.log(err);
  }
};

const initialState = data.comments;
const persistedState = getLocalStorage();

const findPost = (state: CommentData[], postId: number) => {
  const topLevelPost = state.find((post) => post.id === postId);
  const nestedPost = state
    .flatMap((post) => post.replies)
    .find((reply) => reply.id === postId);

  return topLevelPost ?? nestedPost;
};

const generateNumId = () => {
  const nanoid = customAlphabet("1234567890", 18);
  return +nanoid();
};

const postsSlice = createSlice({
  name: "posts",
  initialState: persistedState ?? initialState,
  reducers: {
    // add a new post
    addPost: {
      reducer(
        state,
        action: {
          payload: CommentData;
          type: string;
        },
      ) {
        state.push(action.payload);
        setLocalStorage(state);
      },
      prepare(user: User, content: string) {
        return {
          payload: {
            id: generateNumId(),
            content,
            createdAt: new Date().toISOString(),
            score: 0,
            user,
            replies: [],
          },
        };
      },
    },
    // add a new reply
    addReplyPost: {
      reducer(
        state,
        action: {
          payload: ReplyData & { parentId: number };
          type: string;
        },
      ) {
        const { replyingTo, parentId, ...rest } = action.payload;

        const originalPost = findPost(state, parentId);
        if (!originalPost) return;

        // if replying to another reply
        if ((originalPost as ReplyData)["replyingTo"]) {
          // get parent post where reply exists
          const parentPost = state.find(
            (post) =>
              !!post.replies.find((reply) => reply.id === originalPost.id),
          );

          if (parentPost) {
            // push post to replies
            parentPost.replies.push({
              replyingTo: originalPost.user.username,
              ...rest,
            });
            setLocalStorage(state);
            return;
          }
        }
        // push post to replies
        (originalPost as CommentData).replies.push({
          replyingTo: originalPost.user.username,
          ...rest,
        });
        setLocalStorage(state);
      },
      prepare(user: User, content: string, parentId: number) {
        return {
          payload: {
            id: generateNumId(),
            content,
            createdAt: new Date().toISOString(),
            score: 0,
            replyingTo: "",
            user,
            parentId,
          },
        };
      },
    },
    // edit/update post
    updatePost(
      state,
      action: {
        payload: {
          postId: number;
          content: string;
        };
        type: string;
      },
    ) {
      const { postId, content } = action.payload;

      const existingPost = findPost(state, postId);
      if (!existingPost) return;

      // replace post content
      existingPost.content = content;
      setLocalStorage(state);
    },
    // add/subtract score
    changeScore(
      state,
      action: {
        payload: {
          postId: number;
          method: "ADD" | "SUBTRACT";
          override: boolean;
        };
        type: string;
      },
    ) {
      const { postId, method, override } = action.payload;

      const existingPost = findPost(state, postId);
      if (!existingPost) return;

      if (override) {
        method === "ADD"
          ? (existingPost.score += 2)
          : (existingPost.score -= 2);
        setLocalStorage(state);
        return;
      }

      method === "ADD" ? existingPost.score++ : existingPost.score--;
      setLocalStorage(state);
    },
    // delete post
    deletePost(
      state,
      action: {
        payload: {
          postId: number;
        };
        type: string;
      },
    ) {
      const { postId } = action.payload;

      const existingPost = findPost(state, postId);
      if (!existingPost) return;

      // if post is a reply
      if ((existingPost as ReplyData)["replyingTo"]) {
        const filteredParentPosts = state.map((post) => {
          // check if parent post has reply
          const postHasReply = post.replies.find(
            (reply) => reply.id === existingPost.id,
          );

          if (postHasReply) {
            // filter reply from parent post replies
            const filteredReplies = post.replies.filter(
              (reply) => reply.id !== existingPost.id,
            );
            return { ...post, replies: filteredReplies };
          }

          return post;
        });

        state = filteredParentPosts;
        setLocalStorage(state);
        return state;
      }
      // filter post from state
      state = state.filter((post) => post.id !== existingPost.id);
      setLocalStorage(state);
      return state;
    },
  },
});

// export selector
export const selectAllPosts = (state: { posts: CommentData[] }) => state.posts;

// export action creators
export const { changeScore, addPost, addReplyPost, updatePost, deletePost } =
  postsSlice.actions;

// export reducer
export default postsSlice.reducer;
