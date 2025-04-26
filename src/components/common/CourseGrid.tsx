import React from "react";

const CourseGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid lg:grid-cols-2 3xl:grid-cols-4 grid-flow-row gap-8 mt-6 course-slider">
      {children}
    </div>
  );
};

export default CourseGrid;
