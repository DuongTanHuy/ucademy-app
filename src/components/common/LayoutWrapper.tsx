"use client";

import React from "react";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const sidebarRef = React.useRef(null);
  const [x, setX] = React.useState(0);
  const [w, setW] = React.useState(0);

  function rs_mousemoveHandler(e: any) {
    if (sidebarRef.current) {
      var dx = e.clientX - x;

      var cw = w + dx;

      if (cw < 700) {
        (
          sidebarRef.current as any
        ).style.gridTemplateColumns = `${cw}px minmax(0, 1fr)`;
      }
    }
  }

  function rs_mouseupHandler() {
    setX(0);
    setW(0);
    // remove event mousemove && mouseup
    document.removeEventListener("mouseup", rs_mouseupHandler);
    document.removeEventListener("mousemove", rs_mousemoveHandler);
  }

  function rs_mousedownHandler(e: any) {
    if (sidebarRef.current) {
      setX(e.clientX);

      var sbWidth = window.getComputedStyle(sidebarRef.current).width;
      setW(parseInt(sbWidth, 10));

      document.addEventListener("mousemove", rs_mousemoveHandler);
      document.addEventListener("mouseup", rs_mouseupHandler);
    }
  }

  React.useEffect(() => {
    const resizeSidebar = document.getElementById("resize-sidebar");
    if (resizeSidebar) {
      resizeSidebar.addEventListener("mousedown", rs_mousedownHandler);
    }

    return () => {
      if (resizeSidebar) {
        resizeSidebar.removeEventListener("mousedown", rs_mousedownHandler);
      }
    };
  });

  return (
    <div
      ref={sidebarRef}
      className="wrapper grid lg:grid-cols-[300px,minmax(0,1fr)] h-screen"
      // onMouseDown={rs_mousedownHandler}
    >
      {children}
    </div>
  );
};

export default LayoutWrapper;
