import { useSelector } from "react-redux";
import { selectModal } from "modal/modalSlice";
import Modal from "modal/Modal";
import SubmitPost from "posts/views/SubmitPost";
import PostsList from "posts/PostsList";

function App() {
  const { openModal } = useSelector(selectModal);

  return (
    <main>
      <h1 className="sr-only">Home</h1>
      <div className="relative min-h-screen bg-neutral-very-light-gray py-4 sm:py-12">
        {openModal && <Modal />}
        {/* main content */}
        <div className="mx-auto flex flex-col gap-5 p-4 sm:max-w-[48rem]">
          <PostsList />
          <SubmitPost type="send" />
        </div>

        <div id="portal"></div>
      </div>
    </main>
  );
}

export default App;
