
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  textClassName?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({
  className,
  textClassName,
  size = "md",
  showText = true,
}: LogoProps) {
  const sizes = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative", sizes[size])}>
        <svg
          className={cn("h-full w-auto", sizes[size])}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 16.5V7.5C21 6.68 20.32 6 19.5 6H16.5V4.5C16.5 3.68 15.82 3 15 3H4.5C3.68 3 3 3.68 3 4.5V19.5C3 20.32 3.68 21 4.5 21H19.5C20.32 21 21 20.32 21 19.5V16.5Z"
            className="fill-book-primary transition-colors duration-300"
          />
          <path
            d="M6 17H15C15.55 17 16 16.55 16 16C16 15.45 15.55 15 15 15H6C5.45 15 5 15.45 5 16C5 16.55 5.45 17 6 17Z"
            className="fill-white"
          />
          <path
            d="M6 13H15C15.55 13 16 12.55 16 12C16 11.45 15.55 11 15 11H6C5.45 11 5 11.45 5 12C5 12.55 5.45 13 6 13Z"
            className="fill-white"
          />
          <path
            d="M6 9H15C15.55 9 16 8.55 16 8C16 7.45 15.55 7 15 7H6C5.45 7 5 7.45 5 8C5 8.55 5.45 9 6 9Z"
            className="fill-white"
          />
        </svg>
      </div>
      {showText && (
        <span
          className={cn(
            "font-display font-semibold tracking-tight text-foreground",
            textSizes[size],
            textClassName
          )}
        >
          Padhchha<span className="text-book-primary">Nepal</span>
        </span>
      )}
    </div>
  );
}
