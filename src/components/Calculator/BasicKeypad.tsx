
import React from "react";
import CalcButton from "./CalcButton";
import { 
  Plus, Minus, X, Divide, Percent, Equal, 
  Delete, RefreshCw, PlusSquare, MinusSquare 
} from "lucide-react";
import { MemoryOperation } from "@/hooks/useCalculator";

interface BasicKeypadProps {
  appendDigit: (digit: string) => void;
  handleOperation: (operator: string) => void;
  calculateResult: () => void;
  clearAll: () => void;
  clearDisplay: () => void;
  handleBackspace: () => void;
  handlePercentage: () => void;
  toggleSign: () => void;
  handleMemory: (operation: MemoryOperation) => void;
  memory: number;
}

export function BasicKeypad({
  appendDigit,
  handleOperation,
  calculateResult,
  clearAll,
  clearDisplay,
  handleBackspace,
  handlePercentage,
  toggleSign,
  handleMemory,
  memory
}: BasicKeypadProps) {
  const debouncedHandleOperation = React.useCallback((operator: string) => {
    handleOperation(operator);
  }, [handleOperation]);

  const debouncedAppendDigit = React.useCallback((digit: string) => {
    appendDigit(digit);
  }, [appendDigit]);

  return (
    <div className="grid grid-cols-4 gap-2">
      <CalcButton 
        variant="memory" 
        onClick={() => handleMemory(MemoryOperation.Clear)}
        disabled={memory === 0}
      >
        MC
      </CalcButton>
      <CalcButton 
        variant="memory" 
        onClick={() => handleMemory(MemoryOperation.Recall)}
        disabled={memory === 0}
      >
        MR
      </CalcButton>
      <CalcButton 
        variant="memory" 
        icon={PlusSquare}
        onClick={() => handleMemory(MemoryOperation.Add)}
      >
        
      </CalcButton>
      <CalcButton 
        variant="memory"
        icon={MinusSquare}
        onClick={() => handleMemory(MemoryOperation.Subtract)}
      >
        
      </CalcButton>

      <CalcButton variant="clear" onClick={clearAll}>
        AC
      </CalcButton>
      <CalcButton variant="clear" onClick={clearDisplay}>
        C
      </CalcButton>
      <CalcButton variant="clear" icon={Delete} onClick={handleBackspace}>
        
      </CalcButton>
      <CalcButton 
        variant="operator" 
        icon={Divide} 
        onClick={() => debouncedHandleOperation('/')}
      >
        
      </CalcButton>

      <CalcButton variant="number" onClick={() => debouncedAppendDigit('7')}>
        7
      </CalcButton>
      <CalcButton variant="number" onClick={() => debouncedAppendDigit('8')}>
        8
      </CalcButton>
      <CalcButton variant="number" onClick={() => debouncedAppendDigit('9')}>
        9
      </CalcButton>
      <CalcButton 
        variant="operator" 
        icon={X} 
        onClick={() => debouncedHandleOperation('*')}
      >
        
      </CalcButton>

      <CalcButton variant="number" onClick={() => debouncedAppendDigit('4')}>
        4
      </CalcButton>
      <CalcButton variant="number" onClick={() => debouncedAppendDigit('5')}>
        5
      </CalcButton>
      <CalcButton variant="number" onClick={() => debouncedAppendDigit('6')}>
        6
      </CalcButton>
      <CalcButton 
        variant="operator" 
        icon={Minus} 
        onClick={() => debouncedHandleOperation('-')}
      >
        
      </CalcButton>

      <CalcButton variant="number" onClick={() => debouncedAppendDigit('1')}>
        1
      </CalcButton>
      <CalcButton variant="number" onClick={() => debouncedAppendDigit('2')}>
        2
      </CalcButton>
      <CalcButton variant="number" onClick={() => debouncedAppendDigit('3')}>
        3
      </CalcButton>
      <CalcButton 
        variant="operator" 
        icon={Plus} 
        onClick={() => debouncedHandleOperation('+')}
      >
        
      </CalcButton>

      <CalcButton variant="function" icon={RefreshCw} onClick={toggleSign}>
        
      </CalcButton>
      <CalcButton variant="number" onClick={() => debouncedAppendDigit('0')}>
        0
      </CalcButton>
      <CalcButton variant="number" onClick={() => debouncedAppendDigit('.')}>
        .
      </CalcButton>
      <CalcButton variant="equals" icon={Equal} onClick={calculateResult}>
        
      </CalcButton>

      <CalcButton variant="function" icon={Percent} onClick={handlePercentage} className="col-span-4">
        
      </CalcButton>
    </div>
  );
}

export default BasicKeypad;
