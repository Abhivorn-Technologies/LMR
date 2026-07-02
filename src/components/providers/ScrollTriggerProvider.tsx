"use client";

import { useEffect, type ReactNode } from "react";

export function ScrollTriggerProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
    };
    init();
  }, []);

  return <>{children}</>;
}
