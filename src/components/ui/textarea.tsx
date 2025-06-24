import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50 outline-none p-3 text-sm rounded-lg w-full dark:bg-grayDarker border border-gray-200 dark:border-opacity-10 focus:!border-primary focusPrimary",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
