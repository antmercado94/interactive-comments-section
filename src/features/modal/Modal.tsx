import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "posts/postsSlice";
import { selectModal, toggleModal } from "modal/modalSlice";
import ModalView from "modal/ModalView";

const Modal = () => {
  const containerEl = document.getElementById("portal");
  const { postId } = useSelector(selectModal);
  const dispatch = useDispatch();

  const handlePostDeleted = () => {
    if (!postId) return;
    dispatch(deletePost({ postId }));
    dispatch(toggleModal({ openModal: false }));
  };

  const handleCloseModal = () => {
    dispatch(toggleModal({ openModal: false }));
  };

  if (!containerEl) return <></>;

  return ReactDOM.createPortal(
    <ModalView deletePost={handlePostDeleted} closeModal={handleCloseModal} />,
    containerEl,
  );
};

export default Modal;
