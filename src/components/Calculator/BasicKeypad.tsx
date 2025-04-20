import { MemoryOperation } from "@/hooks/useCalculator";
import {
  Delete,
  Divide,
  Equal,
  LucideIcon,
  Minus,
  MinusSquare,
  Percent,
  Plus,
  PlusSquare,
  RefreshCw,
  X,
} from "lucide-react";
import React from "react";
import CalcButton from "./CalcButton";

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

interface ButtonConfig {
  label: string;
  variant: "memory" | "clear" | "operator" | "number" | "function" | "equals";
  icon?: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
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
  memory,
}: BasicKeypadProps) {
  const debouncedHandleOperation = React.useCallback(
    (operator: string) => handleOperation(operator),
    [handleOperation],
  );

  const debouncedAppendDigit = React.useCallback(
    (digit: string) => appendDigit(digit),
    [appendDigit],
  );

  // Memory row configuration
  const memoryButtons: ButtonConfig[] = [
    {
      label: "MC",
      variant: "memory",
      onClick: () => handleMemory(MemoryOperation.Clear),
      disabled: memory === 0,
    },
    {
      label: "MR",
      variant: "memory",
      onClick: () => handleMemory(MemoryOperation.Recall),
      disabled: memory === 0,
    },
    {
      label: "M+",
      variant: "memory",
      icon: PlusSquare,
      onClick: () => handleMemory(MemoryOperation.Add),
    },
    {
      label: "M-",
      variant: "memory",
      icon: MinusSquare,
      onClick: () => handleMemory(MemoryOperation.Subtract),
    },
  ];

  // Clear row configuration
  const clearButtons: ButtonConfig[] = [
    {
      label: "AC",
      variant: "clear",
      onClick: clearAll,
    },
    {
      label: "C",
      variant: "clear",
      onClick: clearDisplay,
    },
    {
      label: "Del",
      variant: "clear",
      icon: Delete,
      onClick: handleBackspace,
    },
    {
      label: "÷",
      variant: "operator",
      icon: Divide,
      onClick: () => debouncedHandleOperation("/"),
    },
  ];

  // Number pad configuration with operators
  const numberPadConfig: ButtonConfig[][] = [
    [
      {
        label: "7",
        variant: "number",
        onClick: () => debouncedAppendDigit("7"),
      },
      {
        label: "8",
        variant: "number",
        onClick: () => debouncedAppendDigit("8"),
      },
      {
        label: "9",
        variant: "number",
        onClick: () => debouncedAppendDigit("9"),
      },
      {
        label: "×",
        variant: "operator",
        icon: X,
        onClick: () => debouncedHandleOperation("*"),
      },
    ],
    [
      {
        label: "4",
        variant: "number",
        onClick: () => debouncedAppendDigit("4"),
      },
      {
        label: "5",
        variant: "number",
        onClick: () => debouncedAppendDigit("5"),
      },
      {
        label: "6",
        variant: "number",
        onClick: () => debouncedAppendDigit("6"),
      },
      {
        label: "−",
        variant: "operator",
        icon: Minus,
        onClick: () => debouncedHandleOperation("-"),
      },
    ],
    [
      {
        label: "1",
        variant: "number",
        onClick: () => debouncedAppendDigit("1"),
      },
      {
        label: "2",
        variant: "number",
        onClick: () => debouncedAppendDigit("2"),
      },
      {
        label: "3",
        variant: "number",
        onClick: () => debouncedAppendDigit("3"),
      },
      {
        label: "+",
        variant: "operator",
        icon: Plus,
        onClick: () => debouncedHandleOperation("+"),
      },
    ],
  ];

  // Bottom rows configuration
  const bottomButtons: ButtonConfig[][] = [
    [
      { label: "±", variant: "function", icon: RefreshCw, onClick: toggleSign },
      {
        label: "0",
        variant: "number",
        onClick: () => debouncedAppendDigit("0"),
      },
      {
        label: ".",
        variant: "number",
        onClick: () => debouncedAppendDigit("."),
      },
      { label: "=", variant: "equals", icon: Equal, onClick: calculateResult },
    ],
    [
      {
        label: "%",
        variant: "function",
        icon: Percent,
        onClick: handlePercentage,
        className: "col-span-4",
      },
    ],
  ];

  const renderButton = (config: ButtonConfig) => (
    <CalcButton
      key={config.label}
      variant={config.variant}
      icon={config.icon}
      onClick={config.onClick}
      disabled={config.disabled}
      className={config.className}
    >
      {config.label}
    </CalcButton>
  );

  return (
    <div className="grid grid-cols-4 gap-2">
      {/* Memory buttons */}
      {memoryButtons.map(renderButton)}

      {/* Clear buttons */}
      {clearButtons.map(renderButton)}

      {/* Number pad with operators */}
      {numberPadConfig.map((row, i) => (
        <React.Fragment key={`number-row-${i}`}>
          {row.map(renderButton)}
        </React.Fragment>
      ))}

      {/* Bottom rows */}
      {bottomButtons.map((row, i) => (
        <React.Fragment key={`bottom-row-${i}`}>
          {row.map(renderButton)}
        </React.Fragment>
      ))}
    </div>
  );
}

export default BasicKeypad;
