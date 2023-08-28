import { TextareaHTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "~/utils/cn";

const textareaVariants = cva(
  "resize-none focus:border-primary-moderate-blue focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "rounded-md text-neutral-dark-blue placeholder-neutral-grayish-blue border-[1.8px] border-neutral-light-gray",
      },
      size: {
        default: "w-full px-[1.4rem] py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, children, variant, size, ...props }, ref) => {
    return (
      <textarea
        ref={ref as React.LegacyRef<HTMLTextAreaElement> | undefined}
        className={cn(textareaVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </textarea>
    );
  },
);

Textarea.displayName = "Textarea";
export default Textarea;
