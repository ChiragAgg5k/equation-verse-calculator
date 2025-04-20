import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HistoryItem } from "@/hooks/useCalculator";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

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
    <div className="w-full bg-calculator-display rounded-lg p-3 shadow-inner flex flex-col">
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

      <ScrollArea
        className={cn(
          "w-full pr-4",
          history.length > 0 ? "h-[250px]" : "h-[50px]",
        )}
      >
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
                className="w-full text-left p-2 rounded-md hover:bg-calculator-display-text/10 transition-colors group"
              >
                <div className="flex justify-between items-start">
                  <div className="text-calculator-display-text/70 text-sm font-mono group-hover:text-calculator-display-text transition-colors">
                    {item.expression}
                  </div>
                  <div className="text-calculator-display-text/50 text-xs ml-2 shrink-0">
                    {formatDate(item.timestamp)}
                  </div>
                </div>
                <div className="text-calculator-display-text font-mono font-medium mt-1">
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
