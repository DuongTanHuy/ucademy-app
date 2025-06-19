import { cn } from "@/lib/utils";
import React from "react";

const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="w-fit">
      <h1
        className={cn(
          "text-2xl font-bold w-full bg-gradient-to-r from-secondary to-[#9d8189] bg-clip-text text-transparent",
          className
        )}
      >
        {children}
      </h1>
      <div className="w-full h-1 mt-2 rounded-sm bg-gradient-to-r from-secondary/50 dark:from-secondary to-[#9d8189]/40 dark:to-[#9d8189]" />
    </div>
  );
};

export default Heading;
