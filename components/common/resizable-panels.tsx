"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface ResizablePanelsProps {
  children: [React.ReactNode, React.ReactNode];
  initialSize?: number; // Initial size of the left panel in percentage
}

export function ResizablePanels({
  children,
  initialSize = 33,
}: ResizablePanelsProps) {
  const [panelWidth, setPanelWidth] = useState(initialSize);
  const isResizing = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isResizing.current = true;
    e.preventDefault();
  };

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isResizing.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
        // Clamp the width between 20% and 80%
        setPanelWidth(Math.max(20, Math.min(80, newWidth)));
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div ref={containerRef} className="flex h-full w-full">
      <div
        style={{ width: `${panelWidth}%` }}
        className="min-w-[250px] max-w-[50%]"
      >
        {children[0]}
      </div>

      <div
        className="w-2 cursor-col-resize flex items-center justify-center group"
        onMouseDown={handleMouseDown}
      >
        <div className="w-0.5 h-full bg-border group-hover:bg-primary transition-colors duration-200" />
      </div>

      <div style={{ width: `${100 - panelWidth}%` }} className="flex-1">
        {children[1]}
      </div>
    </div>
  );
}

