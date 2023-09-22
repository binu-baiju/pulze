import * as React from "react";

import { cn } from "../lib/utils";

// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {
//     customProp: string;
//   }
// const Input = React.forwardRef<HTMLInputElement, InputProps>(
const BorderLessInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md  bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring  disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
BorderLessInput.displayName = "BorderlessInput";

export { BorderLessInput };
