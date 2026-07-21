import React from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col h-[60vh] w-full items-center justify-center gap-6 z-50 bg-background/80 backdrop-blur-sm relative">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 h-24 w-24 -m-4 rounded-full bg-[#115E59]/10 blur-xl animate-pulse pointer-events-none" />
        
        {/* Inner spinning loader */}
        <Loader2 className="h-12 w-12 text-[#115E59] animate-spin drop-shadow-sm" />
      </div>
      
      {/* Subtle branding text */}
      <div className="flex flex-col items-center">
        <span className="text-sm font-semibold tracking-[0.2em] text-[#115E59] uppercase animate-pulse">
          Loading
        </span>
      </div>
    </div>
  );
}
