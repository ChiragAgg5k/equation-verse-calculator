import { cn } from "@/lib/utils";
import { AlertCircle, Check, Copy } from "lucide-react";
import { useState } from "react";

interface DisplayProps {
  display: string;
  expression: string;
  error: string | null;
  copyToClipboard: () => void;
}

export function Display({
  display,
  expression,
  error,
  copyToClipboard,
}: DisplayProps) {
  const [showCopyAnimation, setShowCopyAnimation] = useState(false);

  const handleCopy = () => {
    copyToClipboard();
    setShowCopyAnimation(true);
    setTimeout(() => setShowCopyAnimation(false), 1000);
  };

  return (
    <div className="relative w-full p-4 mb-2 bg-calculator-display rounded-lg shadow-inner min-h-[100px] flex flex-col items-end justify-end overflow-hidden font-mono">
      {/* Expression display */}
      <div className="w-full text-right mb-1 text-calculator-display-text/70 text-sm font-mono overflow-x-auto whitespace-nowrap scrollbar-none">
        {expression}
      </div>

      {/* Error display */}
      {error && (
        <div className="w-full flex items-center justify-start gap-2 mb-2 text-destructive text-sm animate-fade-in">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Main display */}
      <div className="w-full flex items-center justify-between">
        <button
          onClick={handleCopy}
          className={cn(
            "text-calculator-display-text/50 hover:text-calculator-display-text p-1 rounded-md transition-all duration-200",
            showCopyAnimation && "scale-110 text-green-500",
          )}
          aria-label="Copy result"
        >
          {showCopyAnimation ? <Check size={16} /> : <Copy size={16} />}
        </button>

        <div
          className={cn(
            "text-right font-mono text-2xl md:text-3xl font-bold overflow-x-auto whitespace-nowrap scrollbar-none",
            "text-calculator-display-text",
          )}
        >
          {display}
        </div>
      </div>
    </div>
  );
}

export default Display;
