import { ButtonHTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "~/utils/cn";

const buttonVariants = cva("hover:opacity-25", {
  variants: {
    variant: {
      default:
        "rounded-md bg-primary-moderate-blue font-medium uppercase text-neutral-white",
      ghostWithIcon: "flex items-center gap-2 font-medium",
    },
    size: {
      default: "px-7 py-3",
      modal: "px-3 sm:px-5 py-[0.8rem]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
