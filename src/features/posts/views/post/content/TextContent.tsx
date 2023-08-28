import { Ref, useContext, useState } from "react";
import { PostContext } from "posts/context/PostContext";
import { CommentData, ReplyData } from "posts/postsSlice";
import Button from "~/components/ui/Button";
import Textarea from "~/components/ui/Textarea";

const TextContent = () => {
  const {
    postData,
    toggleEdit,
    textContent,
    editTextareaRef,
    handleTextContentUpdate,
  } = useContext(PostContext);

  const [updateTextContent, setUpdateTextContent] = useState<string>("");

  const { id } = postData as CommentData | ReplyData;
  const replyingTo = (postData as ReplyData)["replyingTo"] ?? "";

  const parseTextContent = (text: string) => {
    if (!replyingTo) return text;

    const authorAt = `@${replyingTo}`;

    if (!toggleEdit) {
      let textWithoutAuthorAt;

      if (text.startsWith(authorAt)) {
        // get text without reply name
        textWithoutAuthorAt = text.slice(authorAt.length);
      }

      return (
        <>
          <span className="font-medium text-primary-moderate-blue">
            {authorAt}
          </span>
          {textWithoutAuthorAt ?? " " + text}
        </>
      );
    }

    if (!text.startsWith(authorAt)) return authorAt + " " + text;

    return text;
  };

  return (
    <>
      {!toggleEdit ? (
        <div className="text-neutral-grayish-blue">
          <p>{parseTextContent(textContent)}</p>
        </div>
      ) : (
        <div className="grow-wrap mt-3 gap-6">
          <Textarea
            ref={editTextareaRef as Ref<HTMLTextAreaElement>}
            onFocus={(e) =>
              // https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/
              ((e.target as any).parentNode.dataset.replicatedValue =
                e.target.value)
            }
            onChange={(e) => setUpdateTextContent(e.target.value)}
            defaultValue={parseTextContent(textContent) as string}
          ></Textarea>
          <Button
            id="update"
            className="justify-self-end"
            onClick={() => handleTextContentUpdate(id, updateTextContent)}
          >
            update
          </Button>
        </div>
      )}
    </>
  );
};

export default TextContent;
