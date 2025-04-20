import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type ButtonVariant =
  | "number"
  | "operator"
  | "function"
  | "clear"
  | "equals"
  | "memory"
  | "toggle";

interface CalcButtonProps {
  onClick: () => void;
  variant?: ButtonVariant;
  className?: string;
  icon?: LucideIcon;
  fullWidth?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export function CalcButton({
  onClick,
  variant = "number",
  className,
  icon: Icon,
  fullWidth = false,
  disabled = false,
  children,
}: CalcButtonProps) {
  // Map variants to appropriate styles
  const variantStyles: Record<ButtonVariant, string> = {
    number:
      "bg-calculator-number text-calculator-number-text hover:bg-calculator-number/80",
    operator:
      "bg-calculator-operator text-calculator-operator-text hover:bg-calculator-operator/80",
    function:
      "bg-calculator-function text-calculator-function-text hover:bg-calculator-function/80",
    clear:
      "bg-calculator-clear text-calculator-clear-text hover:bg-calculator-clear/80",
    equals:
      "bg-calculator-equals text-calculator-equals-text hover:bg-calculator-equals/80",
    memory:
      "bg-calculator-memory text-calculator-memory-text hover:bg-calculator-memory/80",
    toggle:
      "bg-calculator-function text-calculator-function-text hover:bg-calculator-function/80",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-lg p-2 md:p-3 flex items-center justify-center font-medium transition-all active:animate-button-press select-none",
        variantStyles[variant],
        fullWidth ? "col-span-2" : "",
        disabled ? "opacity-50 cursor-not-allowed" : "",
        className,
      )}
    >
      {Icon ? <Icon className="size-5" size={18} /> : children}
    </button>
  );
}

export default CalcButton;
