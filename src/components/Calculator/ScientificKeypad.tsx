import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MemoryOperation } from "@/hooks/useCalculator";
import { AngleMode } from "@/utils/mathOperations";
import {
  Box,
  ChevronsUp,
  Delete,
  Divide,
  Equal,
  LucideIcon,
  Minus,
  MinusSquare,
  Percent,
  Pi,
  Plus,
  PlusSquare,
  RefreshCw,
  Square,
  X,
} from "lucide-react";
import React from "react";
import CalcButton from "./CalcButton";

type ButtonVariant =
  | "toggle"
  | "memory"
  | "clear"
  | "function"
  | "operator"
  | "number"
  | "equals";

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

interface ButtonConfig {
  label: string;
  variant: ButtonVariant;
  onClick: () => void;
  icon?: LucideIcon;
  disabled?: boolean;
  tooltip?: {
    title: string;
    description: string;
    example: string;
    link: string;
  };
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
  toggleAngleMode,
}: ScientificKeypadProps) {
  const debouncedHandleOperation = React.useCallback(
    (operator: string) => handleOperation(operator),
    [handleOperation],
  );

  const debouncedAppendDigit = React.useCallback(
    (digit: string) => appendDigit(digit),
    [appendDigit],
  );

  // Group related buttons into configurations
  const memoryButtons: ButtonConfig[] = [
    {
      label: angleMode,
      variant: "toggle",
      onClick: toggleAngleMode,
    },
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
      onClick: () => handleMemory(MemoryOperation.Add),
      icon: PlusSquare,
    },
    {
      label: "M-",
      variant: "memory",
      onClick: () => handleMemory(MemoryOperation.Subtract),
      icon: MinusSquare,
    },
    {
      label: "Del",
      variant: "clear",
      onClick: handleBackspace,
      icon: Delete,
    },
  ];

  const clearAndBaseButtons: ButtonConfig[] = [
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
      label: "Bin",
      variant: "function",
      onClick: () => handleBaseConversion("bin"),
      tooltip: {
        title: "Binary",
        description: "Converts a number to its binary representation",
        example: "Example: 100 (decimal) = 1100100 (binary)",
        link: "https://en.wikipedia.org/wiki/Binary_number",
      },
    },
    {
      label: "Oct",
      variant: "function",
      onClick: () => handleBaseConversion("oct"),
      tooltip: {
        title: "Octal",
        description: "Converts a number to its octal representation",
        example: "Example: 100 (decimal) = 144 (octal)",
        link: "https://en.wikipedia.org/wiki/Octal",
      },
    },
    {
      label: "Hex",
      variant: "function",
      onClick: () => handleBaseConversion("hex"),
      tooltip: {
        title: "Hexadecimal",
        description: "Converts a number to its hexadecimal representation",
        example: "Example: 255 (decimal) = FF (hexadecimal)",
        link: "https://en.wikipedia.org/wiki/Hexadecimal",
      },
    },
    {
      label: "÷",
      variant: "operator",
      onClick: () => debouncedHandleOperation("/"),
      icon: Divide,
      tooltip: {
        title: "Division",
        description: "Divides the first number by the second number",
        example: "Example: 6 ÷ 2 = 3",
        link: "https://en.wikipedia.org/wiki/Division_(mathematics)",
      },
    },
  ];

  const parenthesesAndPowersButtons: ButtonConfig[] = [
    {
      label: "(",
      variant: "function",
      onClick: () => debouncedAppendDigit("("),
      tooltip: {
        title: "Left Parenthesis",
        description: "Opens a group of operations",
        example: "Example: (1 + 2) × 3",
        link: "https://en.wikipedia.org/wiki/Bracket#Mathematics",
      },
    },
    {
      label: ")",
      variant: "function",
      onClick: () => debouncedAppendDigit(")"),
      tooltip: {
        title: "Right Parenthesis",
        description: "Closes a group of operations",
        example: "Example: (1 + 2) × 3",
        link: "https://en.wikipedia.org/wiki/Bracket#Mathematics",
      },
    },
    {
      label: "x²",
      variant: "function",
      onClick: () => handleScientificFunction("x^2"),
      icon: Square,
      tooltip: {
        title: "Square",
        description: "Multiplies a number by itself",
        example: "Example: 5² = 25",
        link: "https://en.wikipedia.org/wiki/Square_(algebra)",
      },
    },
    {
      label: "x³",
      variant: "function",
      onClick: () => handleScientificFunction("x^3"),
      icon: Box,
      tooltip: {
        title: "Cube",
        description: "Raises a number to the power of 3",
        example: "Example: 2³ = 8",
        link: "https://en.wikipedia.org/wiki/Cube_(algebra)",
      },
    },
    {
      label: "^",
      variant: "function",
      onClick: () => debouncedHandleOperation("^"),
      icon: ChevronsUp,
      tooltip: {
        title: "Power",
        description: "Raises a number to any power",
        example: "Example: 2^4 = 16",
        link: "https://en.wikipedia.org/wiki/Exponentiation",
      },
    },
    {
      label: "×",
      variant: "operator",
      onClick: () => debouncedHandleOperation("*"),
      icon: X,
      tooltip: {
        title: "Multiplication",
        description: "Multiplies two numbers together",
        example: "Example: 4 × 3 = 12",
        link: "https://en.wikipedia.org/wiki/Multiplication",
      },
    },
  ];

  const numberButtons: ButtonConfig[] = [
    ...[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => ({
      label: num.toString(),
      variant: "number" as ButtonVariant,
      onClick: () => debouncedAppendDigit(num.toString()),
    })),
    {
      label: ".",
      variant: "number" as ButtonVariant,
      onClick: () => debouncedAppendDigit("."),
    },
  ];

  const trigButtons: ButtonConfig[] = [
    {
      label: "sin",
      variant: "function",
      onClick: () => handleScientificFunction("sin"),
      tooltip: {
        title: "Sine Function",
        description: "Calculates the sine of an angle",
        example: `Example: sin(30°) = 0.5 (in ${angleMode})`,
        link: "https://en.wikipedia.org/wiki/Sine",
      },
    },
    {
      label: "cos",
      variant: "function",
      onClick: () => handleScientificFunction("cos"),
      tooltip: {
        title: "Cosine Function",
        description: "Calculates the cosine of an angle",
        example: `Example: cos(60°) = 0.5 (in ${angleMode})`,
        link: "https://en.wikipedia.org/wiki/Trigonometric_functions#Cosine",
      },
    },
    {
      label: "tan",
      variant: "function",
      onClick: () => handleScientificFunction("tan"),
      tooltip: {
        title: "Tangent Function",
        description: "Calculates the tangent of an angle",
        example: `Example: tan(45°) = 1 (in ${angleMode})`,
        link: "https://en.wikipedia.org/wiki/Trigonometric_functions#Tangent",
      },
    },
    {
      label: "sin⁻¹",
      variant: "function",
      onClick: () => handleScientificFunction("asin"),
      tooltip: {
        title: "Inverse Sine (Arcsin)",
        description: "Calculates the angle whose sine equals the input",
        example: "Example: sin⁻¹(0.5) = 30°",
        link: "https://en.wikipedia.org/wiki/Inverse_trigonometric_functions#Arcsin",
      },
    },
  ];

  const operatorButtons: ButtonConfig[] = [
    {
      label: "−",
      variant: "operator",
      onClick: () => debouncedHandleOperation("-"),
      icon: Minus,
      tooltip: {
        title: "Subtraction",
        description: "Subtracts the second number from the first number",
        example: "Example: 5 - 3 = 2",
        link: "https://en.wikipedia.org/wiki/Subtraction",
      },
    },
    {
      label: "+",
      variant: "operator",
      onClick: () => debouncedHandleOperation("+"),
      icon: Plus,
      tooltip: {
        title: "Addition",
        description: "Adds two numbers together",
        example: "Example: 2 + 3 = 5",
        link: "https://en.wikipedia.org/wiki/Addition",
      },
    },
  ];

  const scientificFunctionButtons: ButtonConfig[] = [
    {
      label: "log",
      variant: "function",
      onClick: () => handleScientificFunction("log"),
      tooltip: {
        title: "Logarithm (Base 10)",
        description: "Calculates the base-10 logarithm of a number",
        example: "Example: log(100) = 2",
        link: "https://en.wikipedia.org/wiki/Common_logarithm",
      },
    },
    {
      label: "ln",
      variant: "function",
      onClick: () => handleScientificFunction("ln"),
      tooltip: {
        title: "Natural Logarithm",
        description: "Calculates the natural logarithm (base e) of a number",
        example: "Example: ln(e) = 1",
        link: "https://en.wikipedia.org/wiki/Natural_logarithm",
      },
    },
    {
      label: "√x",
      variant: "function",
      onClick: () => handleScientificFunction("sqrt"),
      tooltip: {
        title: "Square Root",
        description: "Calculates the square root of a number",
        example: "Example: √16 = 4",
        link: "https://en.wikipedia.org/wiki/Square_root",
      },
    },
    {
      label: "e^x",
      variant: "function",
      onClick: () => handleScientificFunction("exp"),
      tooltip: {
        title: "Exponential Function",
        description: "Raises e (Euler's number) to the power of x",
        example: "Example: e^2 ≈ 7.389",
        link: "https://en.wikipedia.org/wiki/Exponential_function",
      },
    },
    {
      label: "10^x",
      variant: "function",
      onClick: () => handleScientificFunction("10^x"),
      tooltip: {
        title: "Power of 10",
        description: "Raises 10 to the power of x",
        example: "Example: 10^3 = 1000",
        link: "https://en.wikipedia.org/wiki/Power_of_10",
      },
    },
    {
      label: "n!",
      variant: "function",
      onClick: () => handleScientificFunction("fact"),
      tooltip: {
        title: "Factorial",
        description: "Multiplies all positive integers up to n",
        example: "Example: 5! = 5×4×3×2×1 = 120",
        link: "https://en.wikipedia.org/wiki/Factorial",
      },
    },
    {
      label: "1/x",
      variant: "function",
      onClick: () => handleScientificFunction("1/x"),
      tooltip: {
        title: "Reciprocal",
        description: "Calculates the multiplicative inverse of a number",
        example: "Example: 1/4 = 0.25",
        link: "https://en.wikipedia.org/wiki/Multiplicative_inverse",
      },
    },
    {
      label: "|x|",
      variant: "function",
      onClick: () => handleScientificFunction("abs"),
      tooltip: {
        title: "Absolute Value",
        description: "Returns the non-negative value of a number",
        example: "Example: |-5| = 5",
        link: "https://en.wikipedia.org/wiki/Absolute_value",
      },
    },
  ];

  const constantButtons: ButtonConfig[] = [
    {
      label: "π",
      variant: "function",
      onClick: () => handleConstant("pi"),
      icon: Pi,
      tooltip: {
        title: "Pi (π)",
        description: "The ratio of a circle's circumference to its diameter",
        example: "π ≈ 3.14159...",
        link: "https://en.wikipedia.org/wiki/Pi",
      },
    },
    {
      label: "e",
      variant: "function",
      onClick: () => handleConstant("e"),
      tooltip: {
        title: "Euler's Number (e)",
        description: "The base of natural logarithms",
        example: "e ≈ 2.71828...",
        link: "https://en.wikipedia.org/wiki/E_(mathematical_constant)",
      },
    },
    {
      label: "±",
      variant: "function",
      onClick: toggleSign,
      icon: RefreshCw,
      tooltip: {
        title: "Toggle Sign",
        description: "Changes the sign of the current number",
        example: "Example: ±5 = -5",
        link: "https://en.wikipedia.org/wiki/Sign_(mathematics)",
      },
    },
  ];

  const miscButtons: ButtonConfig[] = [
    {
      label: "%",
      variant: "function",
      onClick: handlePercentage,
      icon: Percent,
      tooltip: {
        title: "Percentage",
        description: "Converts a number to its percentage representation",
        example: "Example: 0.5 = 50%",
        link: "https://en.wikipedia.org/wiki/Percentage",
      },
    },
    {
      label: "=",
      variant: "equals",
      onClick: calculateResult,
      icon: Equal,
      tooltip: {
        title: "Calculate Result",
        description: "Evaluates the current expression",
        example: "Example: 2 + 3 = 5",
        link: "https://en.wikipedia.org/wiki/Equal_sign",
      },
    },
  ];

  // Update the renderButton function to include tooltip
  const renderButton = (config: ButtonConfig) => {
    if (!config.tooltip) {
      return (
        <CalcButton
          key={config.label}
          variant={config.variant}
          onClick={config.onClick}
          icon={config.icon}
          disabled={config.disabled}
          className="text-sm"
        >
          {config.label}
        </CalcButton>
      );
    }

    return (
      <Tooltip key={config.label} delayDuration={500}>
        <TooltipTrigger asChild>
          <div>
            {" "}
            {/* Wrap in a div since asChild expects a single child */}
            <CalcButton
              variant={config.variant}
              onClick={config.onClick}
              icon={config.icon}
              disabled={config.disabled}
              className="text-sm w-full h-full"
            >
              {config.label}
            </CalcButton>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" align="center" className="max-w-sm">
          <div className="space-y-2">
            <h4 className="font-medium">{config.tooltip.title}</h4>
            <p className="text-sm text-muted-foreground">
              {config.tooltip.description}
            </p>
            <p className="text-sm italic">{config.tooltip.example}</p>
            <a
              href={config.tooltip.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline"
            >
              Learn more
            </a>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  };

  // Layout the buttons in the grid
  return (
    <div className="grid grid-cols-6 gap-2">
      {/* Memory row */}
      {memoryButtons.map(renderButton)}

      {/* Clear and base conversion row */}
      {clearAndBaseButtons.map(renderButton)}

      {/* Parentheses and powers row */}
      {parenthesesAndPowersButtons.map(renderButton)}

      {/* Trig and numbers */}
      {trigButtons.slice(0, 2).map(renderButton)}
      {numberButtons.slice(0, 3).map(renderButton)}
      {operatorButtons[0] && renderButton(operatorButtons[0])}

      {/* More trig and numbers */}
      {trigButtons.slice(2).map(renderButton)}
      {numberButtons.slice(3, 6).map(renderButton)}
      {operatorButtons[1] && renderButton(operatorButtons[1])}

      {/* Scientific functions and numbers */}
      {scientificFunctionButtons.slice(0, 2).map(renderButton)}
      {numberButtons.slice(6, 9).map(renderButton)}
      {scientificFunctionButtons[2] &&
        renderButton(scientificFunctionButtons[2])}

      {/* Constants and special functions */}
      {constantButtons.map(renderButton)}
      {numberButtons[9] && renderButton(numberButtons[9])}
      {numberButtons[10] && renderButton(numberButtons[10])}
      {scientificFunctionButtons[3] &&
        renderButton(scientificFunctionButtons[3])}

      {/* Last row */}
      {scientificFunctionButtons.slice(4, 8).map(renderButton)}
      {miscButtons.map(renderButton)}
    </div>
  );
}

export default ScientificKeypad;
