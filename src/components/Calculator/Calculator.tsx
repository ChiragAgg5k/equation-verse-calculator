import { CalculatorMode, useCalculator } from "@/hooks/useCalculator";
import { cn } from "@/lib/utils";
import {
  Calculator as CalculatorIcon,
  ChevronDown,
  ChevronUp,
  Clock,
} from "lucide-react";
import { useState } from "react";
import ThemeToggle from "../ThemeToggle";
import BasicKeypad from "./BasicKeypad";
import Display from "./Display";
import History from "./History";
import ScientificKeypad from "./ScientificKeypad";

export function Calculator() {
  const calculator = useCalculator();
  const [historyVisible, setHistoryVisible] = useState(false);

  return (
    <div className="bg-gradient-to-b from-background to-muted p-4 md:p-6 rounded-xl border border-border shadow-xl max-w-lg w-full mx-auto transition-all duration-500 glass-effect">
      {/* Header with title and theme toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <CalculatorIcon className="mr-2 h-5 w-5 text-primary" />
          <h1 className="text-lg font-bold text-foreground">
            {calculator.mode === CalculatorMode.Basic
              ? "Basic Calculator"
              : "Scientific Calculator"}
          </h1>
        </div>
        <div className="flex space-x-2">
          <ThemeToggle />
          <button
            onClick={() => setHistoryVisible(!historyVisible)}
            className="p-3 rounded-full bg-calculator-number hover:bg-calculator-number/90 transition-colors text-calculator-number-text"
            aria-label="Toggle history"
          >
            <Clock size={18} />
          </button>
        </div>
      </div>

      {/* Display */}
      <Display
        display={calculator.display}
        expression={calculator.expression}
        error={calculator.error}
        copyToClipboard={calculator.copyToClipboard}
      />

      {/* History (collapsible) */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out mb-4",
          historyVisible
            ? calculator.history.length > 0
              ? "h-[300px] opacity-100"
              : "h-[103px] opacity-100"
            : "h-0 opacity-0",
        )}
      >
        <History
          history={calculator.history}
          recallFromHistory={calculator.recallFromHistory}
          clearHistory={calculator.clearHistory}
        />
      </div>

      {/* Calculator mode toggle */}
      <button
        onClick={calculator.toggleMode}
        className="w-full py-2 px-4 mb-4 bg-calculator-function rounded-lg text-calculator-function-text hover:bg-calculator-function/80 transition-colors flex items-center justify-center"
      >
        {calculator.mode === CalculatorMode.Basic ? (
          <>
            Switch to Scientific Mode
            <ChevronDown className="ml-1 h-4 w-4" />
          </>
        ) : (
          <>
            Switch to Basic Mode
            <ChevronUp className="ml-1 h-4 w-4" />
          </>
        )}
      </button>

      {/* Keypad */}
      <div key={calculator.mode} className="animate-fade-in">
        {calculator.mode === CalculatorMode.Basic ? (
          <BasicKeypad
            appendDigit={calculator.appendDigit}
            handleOperation={calculator.handleOperation}
            calculateResult={calculator.calculateResult}
            clearAll={calculator.clearAll}
            clearDisplay={calculator.clearDisplay}
            handleBackspace={calculator.handleBackspace}
            handlePercentage={calculator.handlePercentage}
            toggleSign={calculator.toggleSign}
            handleMemory={calculator.handleMemory}
            memory={calculator.memory}
          />
        ) : (
          <ScientificKeypad
            appendDigit={calculator.appendDigit}
            handleOperation={calculator.handleOperation}
            calculateResult={calculator.calculateResult}
            clearAll={calculator.clearAll}
            clearDisplay={calculator.clearDisplay}
            handleBackspace={calculator.handleBackspace}
            handlePercentage={calculator.handlePercentage}
            toggleSign={calculator.toggleSign}
            handleMemory={calculator.handleMemory}
            handleScientificFunction={calculator.handleScientificFunction}
            handleConstant={calculator.handleConstant}
            handleBaseConversion={calculator.handleBaseConversion}
            memory={calculator.memory}
            angleMode={calculator.angleMode}
            toggleAngleMode={calculator.toggleAngleMode}
          />
        )}
      </div>
    </div>
  );
}

export default Calculator;
