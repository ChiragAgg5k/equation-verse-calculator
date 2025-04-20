import * as math from "@/utils/mathOperations";
import { useCallback, useEffect, useState } from "react";

// Define the available calculator modes
export enum CalculatorMode {
  Basic = "Basic",
  Scientific = "Scientific",
}

// Define angle modes for trigonometric functions
export type AngleMode = math.AngleMode;

// Define memory operations
export enum MemoryOperation {
  Add = "Add",
  Subtract = "Subtract",
  Recall = "Recall",
  Clear = "Clear",
}

// Define history item interface
export interface HistoryItem {
  expression: string;
  result: string;
  timestamp: Date;
}

// Main calculator hook
export function useCalculator() {
  // State for calculator display and operation
  const [display, setDisplay] = useState<string>("0");
  const [expression, setExpression] = useState<string>("");
  const [memory, setMemory] = useState<number>(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [mode, setMode] = useState<CalculatorMode>(CalculatorMode.Basic);
  const [angleMode, setAngleMode] = useState<AngleMode>(math.AngleMode.DEG);
  const [isNewCalculation, setIsNewCalculation] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastOperation, setLastOperation] = useState<string | null>(null);

  // Load history from localStorage on component mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("calculatorHistory");
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        // Convert string timestamps back to Date objects
        const formattedHistory = parsedHistory.map(
          (item: Omit<HistoryItem, "timestamp"> & { timestamp: string }) => ({
            ...item,
            timestamp: new Date(item.timestamp),
          }),
        );
        setHistory(formattedHistory);
      }
    } catch (error) {
      console.error("Error loading calculator history:", error);
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("calculatorHistory", JSON.stringify(history));
    } catch (error) {
      console.error("Error saving calculator history:", error);
    }
  }, [history]);

  // Clear the display
  const clearDisplay = useCallback(() => {
    setDisplay("0");
    setIsNewCalculation(true);
    setError(null);
  }, []);

  // Clear everything (display and expression)
  const clearAll = useCallback(() => {
    setDisplay("0");
    setExpression("");
    setIsNewCalculation(true);
    setError(null);
    setLastOperation(null);
  }, []);

  // Handle backspace (delete the last character)
  const handleBackspace = useCallback(() => {
    if (error) {
      setError(null);
      setDisplay("0");
      return;
    }

    if (display === "0" || display.length === 1) {
      setDisplay("0");
    } else {
      setDisplay((prev) => prev.slice(0, -1));
    }
  }, [display, error]);

  // Add a digit to the display
  const appendDigit = useCallback(
    (digit: string) => {
      if (error) {
        setError(null);
        setDisplay(digit);
        return;
      }

      if (isNewCalculation) {
        setDisplay(digit);
        setIsNewCalculation(false);
      } else {
        setDisplay((prev) => {
          // Avoid multiple zeros at the beginning
          if (prev === "0" && digit !== ".") {
            return digit;
          }
          // Avoid multiple decimal points
          if (digit === "." && prev.includes(".")) {
            return prev;
          }
          return prev + digit;
        });
      }
    },
    [isNewCalculation, error],
  );

  // Handle operation buttons (+, -, *, /)
  const handleOperation = useCallback(
    (operator: string) => {
      if (error) {
        setError(null);
      }

      try {
        // If there's already an expression, evaluate it first
        const currentValue = parseFloat(display);

        if (expression) {
          // Evaluate the current expression
          const result = math.parseInput(`${expression} ${currentValue}`);
          setDisplay(result.toString());
          setExpression(`${result} ${operator}`);
        } else {
          // Start a new expression
          setExpression(`${currentValue} ${operator}`);
        }

        setIsNewCalculation(true);
        setLastOperation(operator);
      } catch (err) {
        setError("Error in calculation");
      }
    },
    [display, expression, error],
  );

  // Calculate the result
  const calculateResult = useCallback(() => {
    if (error) {
      setError(null);
      return;
    }

    try {
      const currentValue = parseFloat(display);
      let result: number;

      if (!expression) {
        // If no expression, just return the current display value
        result = currentValue;
      } else {
        // Evaluate the full expression
        result = math.parseInput(`${expression} ${currentValue}`);
      }

      // Format the result to avoid precision issues
      const formattedResult = math.formatNumber(result);

      // Add to history
      const historyItem: HistoryItem = {
        expression: expression
          ? `${expression} ${currentValue} =`
          : `${currentValue} =`,
        result: formattedResult,
        timestamp: new Date(),
      };
      setHistory((prev) => [historyItem, ...prev].slice(0, 50)); // Keep only last 50 items

      // Update display and reset expression
      setDisplay(formattedResult);
      setExpression("");
      setIsNewCalculation(true);
      setLastOperation(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error in calculation");
      }
    }
  }, [display, expression, error]);

  // Handle memory operations (M+, M-, MR, MC)
  const handleMemory = useCallback(
    (operation: MemoryOperation) => {
      if (error) {
        setError(null);
      }

      const currentValue = parseFloat(display);

      switch (operation) {
        case MemoryOperation.Add:
          setMemory((prev) => prev + currentValue);
          setIsNewCalculation(true);
          break;
        case MemoryOperation.Subtract:
          setMemory((prev) => prev - currentValue);
          setIsNewCalculation(true);
          break;
        case MemoryOperation.Recall:
          setDisplay(memory.toString());
          setIsNewCalculation(false);
          break;
        case MemoryOperation.Clear:
          setMemory(0);
          break;
      }
    },
    [display, memory, error],
  );

  // Handle percentage calculation
  const handlePercentage = useCallback(() => {
    if (error) {
      setError(null);
    }

    try {
      const currentValue = parseFloat(display);
      let result: number;

      if (expression) {
        // If there's an expression, calculate percentage relative to the previous number
        const parts = expression.trim().split(" ");
        const prevValue = parseFloat(parts[0]);
        const operator = parts[1];

        if (operator === "+" || operator === "-") {
          // For addition and subtraction, calculate percentage of the first number
          result = math.percentage(prevValue, currentValue);
        } else {
          // For multiplication and division, just convert to decimal
          result = currentValue / 100;
        }
      } else {
        // If no expression, just convert to decimal
        result = currentValue / 100;
      }

      setDisplay(result.toString());
      setIsNewCalculation(false);
    } catch (err) {
      setError("Error calculating percentage");
    }
  }, [display, expression, error]);

  // Handle sign change (positive/negative)
  const toggleSign = useCallback(() => {
    if (error) {
      setError(null);
    }

    if (display !== "0") {
      setDisplay((prev) =>
        prev.startsWith("-") ? prev.substring(1) : `-${prev}`,
      );
    }
  }, [display, error]);

  // Handle scientific functions
  const handleScientificFunction = useCallback(
    (func: string) => {
      if (error) {
        setError(null);
      }

      try {
        const currentValue = parseFloat(display);
        let result: number;

        switch (func) {
          case "sin":
            result = math.sin(currentValue, angleMode);
            break;
          case "cos":
            result = math.cos(currentValue, angleMode);
            break;
          case "tan":
            result = math.tan(currentValue, angleMode);
            break;
          case "asin":
            result = math.asin(currentValue, angleMode);
            break;
          case "acos":
            result = math.acos(currentValue, angleMode);
            break;
          case "atan":
            result = math.atan(currentValue, angleMode);
            break;
          case "log":
            result = math.log10(currentValue);
            break;
          case "ln":
            result = math.ln(currentValue);
            break;
          case "exp":
            result = math.exp(currentValue);
            break;
          case "10^x":
            result = math.pow10(currentValue);
            break;
          case "x^2":
            result = math.power(currentValue, 2);
            break;
          case "x^3":
            result = math.power(currentValue, 3);
            break;
          case "sqrt":
            result = math.sqrt(currentValue);
            break;
          case "cbrt":
            result = Math.cbrt(currentValue);
            break;
          case "1/x":
            result = 1 / currentValue;
            break;
          case "fact":
            result = math.factorial(currentValue);
            break;
          case "abs":
            result = math.abs(currentValue);
            break;
          case "sinh":
            result = math.sinh(currentValue);
            break;
          case "cosh":
            result = math.cosh(currentValue);
            break;
          case "tanh":
            result = math.tanh(currentValue);
            break;
          case "asinh":
            result = math.asinh(currentValue);
            break;
          case "acosh":
            result = math.acosh(currentValue);
            break;
          case "atanh":
            result = math.atanh(currentValue);
            break;
          default:
            throw new Error("Unknown function");
        }

        // Add to history
        const historyItem: HistoryItem = {
          expression: `${func}(${currentValue}) =`,
          result: result.toString(),
          timestamp: new Date(),
        };
        setHistory((prev) => [historyItem, ...prev].slice(0, 50));

        setDisplay(result.toString());
        setIsNewCalculation(true);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error in calculation");
        }
      }
    },
    [display, angleMode, error],
  );

  // Handle constants (π, e, etc.)
  const handleConstant = useCallback(
    (constant: string) => {
      if (error) {
        setError(null);
      }

      let value: number;

      switch (constant) {
        case "pi":
          value = math.CONSTANTS.PI;
          break;
        case "e":
          value = math.CONSTANTS.E;
          break;
        case "avogadro":
          value = math.CONSTANTS.AVOGADRO;
          break;
        case "boltzmann":
          value = math.CONSTANTS.BOLTZMANN;
          break;
        case "electron":
          value = math.CONSTANTS.ELECTRON_MASS;
          break;
        case "planck":
          value = math.CONSTANTS.PLANCK;
          break;
        case "c":
          value = math.CONSTANTS.SPEED_OF_LIGHT;
          break;
        case "g":
          value = math.CONSTANTS.GRAVITY;
          break;
        default:
          throw new Error("Unknown constant");
      }

      setDisplay(value.toString());
      setIsNewCalculation(false);
    },
    [error],
  );

  // Handle number base conversions
  const handleBaseConversion = useCallback(
    (toBase: string) => {
      if (error) {
        setError(null);
      }

      try {
        const currentValue = parseInt(display);
        let result: string;

        switch (toBase) {
          case "bin":
            result = math.toBinary(currentValue);
            break;
          case "oct":
            result = math.toOctal(currentValue);
            break;
          case "hex":
            result = math.toHexadecimal(currentValue);
            break;
          default:
            throw new Error("Unknown base conversion");
        }

        // Add to history
        const historyItem: HistoryItem = {
          expression: `${currentValue} to ${toBase} =`,
          result: result,
          timestamp: new Date(),
        };
        setHistory((prev) => [historyItem, ...prev].slice(0, 50));

        setDisplay(result);
        setIsNewCalculation(true);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error in calculation");
        }
      }
    },
    [display, error],
  );

  // Parse non-decimal input
  const parseBaseInput = useCallback(
    (input: string, fromBase: string) => {
      if (error) {
        setError(null);
      }

      try {
        let result: number;

        switch (fromBase) {
          case "bin":
            result = math.fromBinary(input);
            break;
          case "oct":
            result = math.fromOctal(input);
            break;
          case "hex":
            result = math.fromHexadecimal(input);
            break;
          default:
            throw new Error("Unknown base conversion");
        }

        setDisplay(result.toString());
        setIsNewCalculation(true);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error parsing input");
        }
      }
    },
    [error],
  );

  // Copy result to clipboard
  const copyToClipboard = useCallback(() => {
    if (!error) {
      navigator.clipboard
        .writeText(display)
        .catch((err) => console.error("Failed to copy to clipboard:", err));
    }
  }, [display, error]);

  // Recall a result from history
  const recallFromHistory = useCallback((item: HistoryItem) => {
    setDisplay(item.result);
    setIsNewCalculation(true);
  }, []);

  // Clear history
  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem("calculatorHistory");
  }, []);

  // Toggle between basic and scientific modes
  const toggleMode = useCallback(() => {
    setMode((prevMode) =>
      prevMode === CalculatorMode.Basic
        ? CalculatorMode.Scientific
        : CalculatorMode.Basic,
    );
  }, []);

  // Toggle between angle modes (DEG, RAD, GRAD)
  const toggleAngleMode = useCallback(() => {
    setAngleMode((prevMode) => {
      switch (prevMode) {
        case math.AngleMode.DEG:
          return math.AngleMode.RAD;
        case math.AngleMode.RAD:
          return math.AngleMode.GRAD;
        case math.AngleMode.GRAD:
          return math.AngleMode.DEG;
        default:
          return math.AngleMode.DEG;
      }
    });
  }, []);

  // Handle keyboard input
  const handleKeyboardInput = useCallback(
    (key: string) => {
      // Number keys and decimal point
      if (/^[0-9.]$/.test(key)) {
        appendDigit(key);
        return;
      }

      // Basic operations
      switch (key) {
        case "+":
        case "-":
        case "*":
        case "/":
          handleOperation(key);
          break;
        case "=":
        case "Enter":
          calculateResult();
          break;
        case "Escape":
          clearAll();
          break;
        case "Backspace":
          handleBackspace();
          break;
        case "%":
          handlePercentage();
          break;
        case "(":
        case ")":
          // Parentheses handling for scientific mode
          if (mode === CalculatorMode.Scientific) {
            appendDigit(key);
          }
          break;
        case "^":
          if (mode === CalculatorMode.Scientific) {
            handleOperation("^");
          }
          break;
        case "p":
        case "P":
          if (mode === CalculatorMode.Scientific) {
            handleConstant("pi");
          }
          break;
        case "e":
        case "E":
          if (mode === CalculatorMode.Scientific) {
            handleConstant("e");
          }
          break;
      }
    },
    [
      appendDigit,
      handleOperation,
      calculateResult,
      clearAll,
      handleBackspace,
      handlePercentage,
      mode,
      handleConstant,
    ],
  );

  // Set up keyboard event listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) {
        return; // Ignore if modifier keys are pressed
      }

      handleKeyboardInput(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyboardInput]);

  return {
    display,
    expression,
    memory,
    history,
    mode,
    angleMode,
    error,
    lastOperation,
    clearDisplay,
    clearAll,
    handleBackspace,
    appendDigit,
    handleOperation,
    calculateResult,
    handleMemory,
    handlePercentage,
    toggleSign,
    handleScientificFunction,
    handleConstant,
    handleBaseConversion,
    parseBaseInput,
    copyToClipboard,
    recallFromHistory,
    clearHistory,
    toggleMode,
    toggleAngleMode,
  };
}
