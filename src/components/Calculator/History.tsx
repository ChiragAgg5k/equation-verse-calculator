import React from "react";
import { HistoryItem } from "@/hooks/useCalculator";
import { Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface HistoryProps {
  history: HistoryItem[];
  recallFromHistory: (item: HistoryItem) => void;
  clearHistory: () => void;
}

export function History({
  history,
  recallFromHistory,
  clearHistory,
}: HistoryProps) {
  // Format the date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="w-full bg-calculator-display rounded-lg p-3 shadow-inner max-h-[300px] flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-calculator-display-text font-medium">
          Calculation History
        </h3>
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearHistory}
            className="text-calculator-display-text/50 hover:text-destructive hover:bg-transparent"
          >
            <Trash2 size={16} />
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1">
        {history.length === 0 ? (
          <div className="text-calculator-display-text/50 text-center py-4 italic text-sm">
            No calculation history yet
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((item, index) => (
              <button
                key={index}
                onClick={() => recallFromHistory(item)}
                className="w-full text-left p-2 rounded-md hover:bg-calculator-display-text/10 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="text-calculator-display-text/70 text-sm font-mono">
                    {item.expression}
                  </div>
                  <div className="text-calculator-display-text/50 text-xs">
                    {formatDate(item.timestamp)}
                  </div>
                </div>
                <div className="text-calculator-display-text font-mono font-medium">
                  {item.result}
                </div>
              </button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export default History;
