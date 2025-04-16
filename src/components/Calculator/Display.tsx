
import React from "react";
import { Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface DisplayProps {
  display: string;
  expression: string;
  error: string | null;
  copyToClipboard: () => void;
}

export function Display({ display, expression, error, copyToClipboard }: DisplayProps) {
  return (
    <div className="relative w-full p-4 mb-2 bg-calculator-display rounded-lg shadow-inner min-h-[100px] flex flex-col items-end justify-end overflow-hidden font-mono">
      {/* Expression display */}
      <div className="w-full text-right mb-1 text-calculator-display-text/70 text-sm font-mono overflow-x-auto whitespace-nowrap scrollbar-none">
        {expression}
      </div>
      
      {/* Main display */}
      <div className="w-full flex items-center justify-between">
        <button 
          onClick={copyToClipboard}
          className="text-calculator-display-text/50 hover:text-calculator-display-text p-1 rounded-md transition-colors"
          aria-label="Copy result"
        >
          <Copy size={16} />
        </button>
        
        <div 
          className={cn(
            "text-right font-mono text-2xl md:text-3xl font-bold overflow-x-auto whitespace-nowrap scrollbar-none",
            error ? "text-destructive" : "text-calculator-display-text"
          )}
        >
          {error || display}
        </div>
      </div>
    </div>
  );
}

export default Display;
