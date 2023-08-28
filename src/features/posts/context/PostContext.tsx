import { MutableRefObject, createContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleModal } from "modal/modalSlice";
import { CommentData, ReplyData, updatePost } from "posts/postsSlice";

type CommentType = CommentData | ReplyData | null;

interface Props {
  children: React.ReactNode;
  comment: CommentType;
}

export interface PostContextInterface {
  postData: CommentType;
  textContent: string;
  isUser: boolean;
  toggleReply: boolean;
  toggleEdit: boolean;
  setTextContent: React.Dispatch<React.SetStateAction<string>>;
  setIsUser: React.Dispatch<React.SetStateAction<boolean>>;
  handlePostReply: () => void;
  handlePostEdit: () => void;
  handlePostDelete: (postId: number) => void;
  handleTextContentUpdate: (postId: number, newTextContent: string) => void;
  postTextareaRef: MutableRefObject<HTMLTextAreaElement | undefined> | null;
  editTextareaRef: MutableRefObject<HTMLTextAreaElement | undefined> | null;
}

const initialState = {
  postData: null,
  textContent: "",
  isUser: false,
  toggleReply: false,
  toggleEdit: false,
  setTextContent: () => "",
  setIsUser: () => false,
  handlePostReply: () => null,
  handlePostEdit: () => null,
  handleTextContentUpdate: () => null,
  handlePostDelete: () => null,
  postTextareaRef: null,
  editTextareaRef: null,
};

export const PostContext = createContext<PostContextInterface>(initialState);

const PostContextProvider: React.FC<Props> = ({ children, comment }) => {
  const [postData, _] = useState<CommentType>(comment),
    [isUser, setIsUser] = useState<boolean>(false),
    [textContent, setTextContent] = useState<string>(""),
    [toggleReply, setToggleReply] = useState<boolean>(false),
    [toggleEdit, setToggleEdit] = useState<boolean>(false);

  const dispatch = useDispatch();

  const postTextareaRef = useRef<HTMLTextAreaElement>();
  const editTextareaRef = useRef<HTMLTextAreaElement>();

  // update text of post
  const handleTextContentUpdate = (postId: number, newTextContent: string) => {
    if (!newTextContent || newTextContent === textContent) return;

    dispatch(updatePost({ postId: postId, content: newTextContent }));
    setTextContent(newTextContent);
    setToggleEdit(false);
  };

  // open/close reply text box
  const handlePostReply = () => {
    setToggleReply(!toggleReply);
  };

  // open/close edit text box
  const handlePostEdit = () => {
    setToggleEdit(!toggleEdit);
  };

  // open delete confirmation modal
  const handlePostDelete = (postId: number) => {
    dispatch(toggleModal({ openModal: true, postId }));
  };

  return (
    <PostContext.Provider
      value={{
        postData,
        isUser,
        textContent,
        toggleReply,
        toggleEdit,
        setTextContent,
        setIsUser,
        handlePostEdit,
        handlePostReply,
        handlePostDelete,
        handleTextContentUpdate,
        postTextareaRef,
        editTextareaRef,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
