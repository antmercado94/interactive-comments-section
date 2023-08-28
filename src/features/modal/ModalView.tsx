import Button from "~/components/ui/Button";

type Props = {
  deletePost: () => void;
  closeModal: () => void;
};

const ModalView = ({ deletePost, closeModal }: Props) => {
  // render two modal buttons
  const renderModalButtons = () => {
    return [1, 2].map((button) => (
      <Button
        key={button}
        size={"modal"}
        className={`${
          button === 1 ? "bg-neutral-grayish-blue" : "bg-primary-soft-red"
        } basis-1/2`}
        onClick={button === 1 ? closeModal : deletePost}
      >
        <span className="hidden xs:inline">
          {button === 1 ? "no," : "yes,"}{" "}
        </span>
        {button === 1 ? "cancel" : "delete"}
      </Button>
    ));
  };

  return (
    <div className="fixed top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-5">
      <section>
        <div className="flex max-w-[26rem] flex-col rounded-lg bg-neutral-white px-7 py-7 sm:px-10 sm:py-8">
          <h2 className="text-2xl font-medium text-neutral-dark-blue">
            Delete comment
          </h2>
          <p className="mb-[1.4rem] mt-4 text-neutral-grayish-blue">
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone.
          </p>
          <div className="flex justify-between gap-[.9rem]">
            {renderModalButtons()}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModalView;
