
import React from "react";
import CalcButton from "./CalcButton";
import { 
  Plus, Minus, X, Divide, Percent, Equal, 
  Delete, RotateCcw, PlusSquare, MinusSquare, 
  RefreshCw, Pause
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
  return (
    <div className="grid grid-cols-4 gap-2">
      {/* First row - Memory functions */}
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
        M+
      </CalcButton>
      <CalcButton 
        variant="memory"
        icon={MinusSquare}
        onClick={() => handleMemory(MemoryOperation.Subtract)}
      >
        M-
      </CalcButton>

      {/* Second row - Clear functions */}
      <CalcButton variant="clear" onClick={clearAll}>
        AC
      </CalcButton>
      <CalcButton variant="clear" onClick={clearDisplay}>
        C
      </CalcButton>
      <CalcButton variant="clear" icon={Delete} onClick={handleBackspace}>
        ⌫
      </CalcButton>
      <CalcButton variant="operator" icon={Divide} onClick={() => handleOperation('/')}>
        ÷
      </CalcButton>

      {/* Third row - Numbers 7-9 and multiply */}
      <CalcButton variant="number" onClick={() => appendDigit('7')}>
        7
      </CalcButton>
      <CalcButton variant="number" onClick={() => appendDigit('8')}>
        8
      </CalcButton>
      <CalcButton variant="number" onClick={() => appendDigit('9')}>
        9
      </CalcButton>
      <CalcButton variant="operator" icon={X} onClick={() => handleOperation('*')}>
        ×
      </CalcButton>

      {/* Fourth row - Numbers 4-6 and subtract */}
      <CalcButton variant="number" onClick={() => appendDigit('4')}>
        4
      </CalcButton>
      <CalcButton variant="number" onClick={() => appendDigit('5')}>
        5
      </CalcButton>
      <CalcButton variant="number" onClick={() => appendDigit('6')}>
        6
      </CalcButton>
      <CalcButton variant="operator" icon={Minus} onClick={() => handleOperation('-')}>
        −
      </CalcButton>

      {/* Fifth row - Numbers 1-3 and add */}
      <CalcButton variant="number" onClick={() => appendDigit('1')}>
        1
      </CalcButton>
      <CalcButton variant="number" onClick={() => appendDigit('2')}>
        2
      </CalcButton>
      <CalcButton variant="number" onClick={() => appendDigit('3')}>
        3
      </CalcButton>
      <CalcButton variant="operator" icon={Plus} onClick={() => handleOperation('+')}>
        +
      </CalcButton>

      {/* Sixth row - Sign toggle, zero, decimal, and equals */}
      <CalcButton variant="function" icon={RefreshCw} onClick={toggleSign}>
        +/-
      </CalcButton>
      <CalcButton variant="number" onClick={() => appendDigit('0')}>
        0
      </CalcButton>
      <CalcButton variant="number" onClick={() => appendDigit('.')}>
        .
      </CalcButton>
      <CalcButton variant="equals" icon={Equal} onClick={calculateResult}>
        =
      </CalcButton>

      {/* Extra row for percentage */}
      <CalcButton variant="function" icon={Percent} onClick={handlePercentage} className="col-span-4">
        %
      </CalcButton>
    </div>
  );
}

export default BasicKeypad;
