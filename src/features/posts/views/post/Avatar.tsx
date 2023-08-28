import { cva } from "class-variance-authority";
import { cn } from "~/utils/cn";

const avatarVariants = cva("rounded-full bg-slate-700", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type Props = {
  src: string;
  alt: string;
  size?: "default" | "lg" | null | undefined;
};

const Avatar = ({ src, alt, size }: Props) => {
  return (
    <div className={cn(avatarVariants({ size }))}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default Avatar;
