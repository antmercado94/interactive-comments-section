import Score from "./Score";
import Modifications from "./Modifications";

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <article>
      <div className="flex flex-col gap-4 rounded-lg bg-neutral-white p-4 sm:flex-row-reverse sm:items-start sm:gap-6 sm:px-[1.7rem] sm:py-6">
        <div className="text-content-container flex flex-1 flex-col gap-4 sm:gap-[.85rem]">
          {children}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-0">
          <Score />
          {/* mobile delete/edit/reply */}
          <div className="sm:hidden">
            <Modifications />
          </div>
        </div>
      </div>
    </article>
  );
};

export default Content;
