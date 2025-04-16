import React from "react";
import CalcButton from "./CalcButton";
import { 
  Plus, Minus, X, Divide, Percent, Equal, 
  Delete, RotateCcw, PlusSquare, MinusSquare, 
  RefreshCw, Square, Box, 
  ChevronsUp, ArrowRight, 
  FileDigit, 
  Pi, CircleDot, Binary
} from "lucide-react";
import { MemoryOperation } from "@/hooks/useCalculator";
import { AngleMode } from "@/utils/mathOperations";

interface ScientificKeypadProps {
  appendDigit: (digit: string) => void;
  handleOperation: (operator: string) => void;
  calculateResult: () => void;
  clearAll: () => void;
  clearDisplay: () => void;
  handleBackspace: () => void;
  handlePercentage: () => void;
  toggleSign: () => void;
  handleMemory: (operation: MemoryOperation) => void;
  handleScientificFunction: (func: string) => void;
  handleConstant: (constant: string) => void;
  handleBaseConversion: (toBase: string) => void;
  memory: number;
  angleMode: AngleMode;
  toggleAngleMode: () => void;
}

export function ScientificKeypad({
  appendDigit,
  handleOperation,
  calculateResult,
  clearAll,
  clearDisplay,
  handleBackspace,
  handlePercentage,
  toggleSign,
  handleMemory,
  handleScientificFunction,
  handleConstant,
  handleBaseConversion,
  memory,
  angleMode,
  toggleAngleMode
}: ScientificKeypadProps) {
  const debouncedHandleOperation = React.useCallback((operator: string) => {
    handleOperation(operator);
  }, [handleOperation]);

  const debouncedAppendDigit = React.useCallback((digit: string) => {
    appendDigit(digit);
  }, [appendDigit]);

  return (
    <div className="grid grid-cols-6 gap-2">
      {/* Top row - Angle mode and memory functions */}
      <CalcButton
        variant="toggle"
        onClick={toggleAngleMode}
        className="text-sm"
      >
        {angleMode}
      </CalcButton>
      <CalcButton
        variant="memory"
        onClick={() => handleMemory(MemoryOperation.Clear)}
        disabled={memory === 0}
        className="text-sm"
      >
        MC
      </CalcButton>
      <CalcButton
        variant="memory"
        onClick={() => handleMemory(MemoryOperation.Recall)}
        disabled={memory === 0}
        className="text-sm"
      >
        MR
      </CalcButton>
      <CalcButton
        variant="memory"
        onClick={() => handleMemory(MemoryOperation.Add)}
        className="text-sm"
      >
        M+
      </CalcButton>
      <CalcButton
        variant="memory"
        onClick={() => handleMemory(MemoryOperation.Subtract)}
        className="text-sm"
      >
        M-
      </CalcButton>
      <CalcButton
        variant="clear"
        icon={Delete}
        onClick={handleBackspace}
        className="text-sm"
      >
        ⌫
      </CalcButton>

      {/* Second row - Clear, base conversions and basic operators */}
      <CalcButton variant="clear" onClick={clearAll} className="text-sm">
        AC
      </CalcButton>
      <CalcButton variant="clear" onClick={clearDisplay} className="text-sm">
        C
      </CalcButton>
      <CalcButton
        variant="function"
        onClick={() => handleBaseConversion("bin")}
        icon={Binary}
        className="text-sm"
      >
        BIN
      </CalcButton>
      <CalcButton
        variant="function"
        onClick={() => handleBaseConversion("oct")}
        className="text-sm"
      >
        OCT
      </CalcButton>
      <CalcButton
        variant="function"
        onClick={() => handleBaseConversion("hex")}
        className="text-sm"
      >
        HEX
      </CalcButton>
      <CalcButton
        variant="operator"
        icon={Divide}
        onClick={() => debouncedHandleOperation("/")}
        className="text-sm"
      >
        ÷
      </CalcButton>

      {/* Third row - Parentheses, powers, roots */}
      <CalcButton
        variant="function"
        onClick={() => debouncedAppendDigit("(")}
        className="text-sm"
      >
        (
      </CalcButton>
      <CalcButton
        variant="function"
        onClick={() => debouncedAppendDigit(")")}
        className="text-sm"
      >
        )
      </CalcButton>
      <CalcButton
        variant="function"
        icon={Square}
        onClick={() => handleScientificFunction("x^2")}
        className="text-sm"
      >
        x²
      </CalcButton>
      <CalcButton
        variant="function"
        icon={Box}
        onClick={() => handleScientificFunction("x^3")}
        className="text-sm"
      >
        x³
      </CalcButton>
      <CalcButton
        variant="function"
        icon={ChevronsUp}
        onClick={() => debouncedHandleOperation("^")}
        className="text-sm"
      >
        x^y
      </CalcButton>
      <CalcButton
        variant="operator"
        icon={X}
        onClick={() => debouncedHandleOperation("*")}
        className="text-sm"
      >
        ×
      </CalcButton>

      {/* Fourth row - Trig functions and numbers */}
      <CalcButton
        variant="function"
        onClick={() => handleScientificFunction("sin")}
        className="text-sm"
      >
        sin
      </CalcButton>
      <CalcButton
        variant="function"
        onClick={() => handleScientificFunction("cos")}
        className="text-sm"
      >
        cos
      </CalcButton>
      <CalcButton variant="number" onClick={() => debouncedAppendDigit("7")} className="text-sm">
        7
      </CalcButton>
      <CalcButton variant="number" onClick={() => debouncedAppendDigit("8")} className="text-sm">
        8
      </CalcButton>
      <CalcButton variant="number" onClick={() => debouncedAppendDigit("9")} className="text-sm">
        9
      </CalcButton>
      <CalcButton
        variant="operator"
        icon={Minus}
        onClick={() => debouncedHandleOperation("-")}
        className="text-sm"
      >
        −
      </CalcButton>

      {/* Fifth row - Inverse trig and numbers */}
      <CalcButton
        variant="function"
        onClick={() => handleScientificFunction("tan")}
        className="text-sm"
      >
        tan
      </CalcButton>
      <CalcButton
        variant="function"
        onClick={() => handleScientificFunction("asin")}
        className="text-sm"
      >
        sin⁻¹
      </CalcButton>
      <CalcButton variant="number" onClick={() => debouncedAppendDigit("4")} className="text-sm">
        4
      </CalcButton>
      <CalcButton variant="number" onClick={() => debouncedAppendDigit("5")} className="text-sm">
        5
      </CalcButton>
      <CalcButton variant="number" onClick={() => debouncedAppendDigit("6")} className="text-sm">
        6
      </CalcButton>
      <CalcButton
        variant="operator"
        icon={Plus}
        onClick={() => debouncedHandleOperation("+")}
        className="text-sm"
      >
        +
      </CalcButton>

      {/* Sixth row - Logarithms and numbers */}
      <CalcButton
        variant="function"
        onClick={() => handleScientificFunction("log")}
        className="text-sm"
      >
        log
      </CalcButton>
      <CalcButton
        variant="function"
        onClick={() => handleScientificFunction("ln")}
        className="text-sm"
      >
        ln
      </CalcButton>
      <CalcButton variant="number" onClick={() => debouncedAppendDigit("1")} className="text-sm">
        1
      </CalcButton>
      <CalcButton variant="number" onClick={() => debouncedAppendDigit("2")} className="text-sm">
        2
      </CalcButton>
      <CalcButton variant="number" onClick={() => debouncedAppendDigit("3")} className="text-sm">
        3
      </CalcButton>
      <CalcButton
        variant="function"
        onClick={() => handleScientificFunction("sqrt")}
        className="text-sm"
      >
        √x
      </CalcButton>

      {/* Seventh row - Constants and equals */}
      <CalcButton
        variant="function"
        icon={Pi}
        onClick={() => handleConstant("pi")}
        className="text-sm"
      >
        π
      </CalcButton>
      <CalcButton
        variant="function"
        onClick={() => handleConstant("e")}
        className="text-sm"
      >
        e
      </CalcButton>
      <CalcButton
        variant="function"
        icon={RefreshCw}
        onClick={toggleSign}
        className="text-sm"
      >
        +/-
      </CalcButton>
      <CalcButton variant="number" onClick={() => debouncedAppendDigit("0")} className="text-sm">
        0
      </CalcButton>
      <CalcButton
        variant="number"
        icon={CircleDot}
        onClick={() => debouncedAppendDigit(".")}
        className="text-sm"
      >
        .
      </CalcButton>
      <CalcButton
        variant="equals"
        icon={Equal}
        onClick={calculateResult}
        className="text-sm"
      >
        =
      </CalcButton>

      {/* Bottom row - Additional functions */}
      <CalcButton
        variant="function"
        onClick={() => handleScientificFunction("exp")}
        className="text-sm"
      >
        e^x
      </CalcButton>
      <CalcButton
        variant="function"
        onClick={() => handleScientificFunction("10^x")}
        className="text-sm"
      >
        10^x
      </CalcButton>
      <CalcButton
        variant="function"
        onClick={() => handleScientificFunction("fact")}
        className="text-sm"
      >
        n!
      </CalcButton>
      <CalcButton
        variant="function"
        onClick={() => handleScientificFunction("1/x")}
        className="text-sm"
      >
        1/x
      </CalcButton>
      <CalcButton
        variant="function"
        icon={Percent}
        onClick={handlePercentage}
        className="text-sm"
      >
        %
      </CalcButton>
      <CalcButton
        variant="function"
        onClick={() => handleScientificFunction("abs")}
        className="text-sm"
      >
        |x|
      </CalcButton>
    </div>
  );
}

export default ScientificKeypad;
