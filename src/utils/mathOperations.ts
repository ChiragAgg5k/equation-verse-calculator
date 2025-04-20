// Utility functions for precise decimal calculations
// Using Decimal.js library to avoid floating-point errors
import Decimal from "decimal.js";

// Helper for parsing calculation input
export function parseInput(input: string): number {
  try {
    // Replace mathematical constants with their values
    const preparedInput = input
      .replace(/\bpi\b/gi, CONSTANTS.PI.toString())
      .replace(/\be\b/gi, CONSTANTS.E.toString());

    // Evaluate using Function constructor for expressions
    const result = Function(`'use strict'; return (${preparedInput})`)();
    return result;
  } catch (error) {
    throw new Error("Invalid expression");
  }
}

// Set Decimal precision
Decimal.set({ precision: 30 });

// Add two numbers with precision
export function add(a: number, b: number): number {
  return new Decimal(a).plus(new Decimal(b)).toNumber();
}

// Subtract two numbers with precision
export function subtract(a: number, b: number): number {
  return new Decimal(a).minus(new Decimal(b)).toNumber();
}

// Multiply two numbers with precision
export function multiply(a: number, b: number): number {
  return new Decimal(a).times(new Decimal(b)).toNumber();
}

// Divide two numbers with precision
export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Division by zero");
  }
  return new Decimal(a).dividedBy(new Decimal(b)).toNumber();
}

// Calculate percentage
export function percentage(value: number, percent: number): number {
  return new Decimal(value)
    .times(new Decimal(percent).dividedBy(100))
    .toNumber();
}

// Calculate square root
export function sqrt(value: number): number {
  if (value < 0) {
    throw new Error("Cannot calculate square root of negative number");
  }
  return new Decimal(value).sqrt().toNumber();
}

// Calculate power
export function power(base: number, exponent: number): number {
  return new Decimal(base).pow(new Decimal(exponent)).toNumber();
}

// Factorial calculation
export function factorial(n: number): number {
  if (n < 0) {
    throw new Error("Cannot calculate factorial of negative number");
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  if (!Number.isInteger(n)) {
    throw new Error("Factorial only works with integers");
  }
  if (n > 170) {
    throw new Error("Number too large for factorial calculation");
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Trigonometric functions that support different angle modes
export enum AngleMode {
  DEG = "DEG",
  RAD = "RAD",
  GRAD = "GRAD",
}

// Convert angle to radians based on mode
export function toRadians(angle: number, mode: AngleMode): number {
  switch (mode) {
    case AngleMode.DEG:
      return angle * (Math.PI / 180);
    case AngleMode.GRAD:
      return angle * (Math.PI / 200);
    case AngleMode.RAD:
    default:
      return angle;
  }
}

// Convert radians to the specified angle mode
export function fromRadians(radians: number, mode: AngleMode): number {
  switch (mode) {
    case AngleMode.DEG:
      return radians * (180 / Math.PI);
    case AngleMode.GRAD:
      return radians * (200 / Math.PI);
    case AngleMode.RAD:
    default:
      return radians;
  }
}

// Sin function with angle mode support
export function sin(angle: number, mode: AngleMode): number {
  return Math.sin(toRadians(angle, mode));
}

// Cos function with angle mode support
export function cos(angle: number, mode: AngleMode): number {
  return Math.cos(toRadians(angle, mode));
}

// Tan function with angle mode support
export function tan(angle: number, mode: AngleMode): number {
  const radians = toRadians(angle, mode);
  // Check for undefined values (90 degrees, 270 degrees, etc.)
  if (Math.abs(Math.cos(radians)) < 1e-15) {
    throw new Error("Tangent is undefined at this angle");
  }
  return Math.tan(radians);
}

// Arc sine with angle mode support
export function asin(value: number, mode: AngleMode): number {
  if (value < -1 || value > 1) {
    throw new Error("Inverse sine input must be between -1 and 1");
  }
  return fromRadians(Math.asin(value), mode);
}

// Arc cosine with angle mode support
export function acos(value: number, mode: AngleMode): number {
  if (value < -1 || value > 1) {
    throw new Error("Inverse cosine input must be between -1 and 1");
  }
  return fromRadians(Math.acos(value), mode);
}

// Arc tangent with angle mode support
export function atan(value: number, mode: AngleMode): number {
  return fromRadians(Math.atan(value), mode);
}

// Logarithm base 10
export function log10(value: number): number {
  if (value <= 0) {
    throw new Error("Cannot take logarithm of zero or negative number");
  }
  return Math.log10(value);
}

// Natural logarithm
export function ln(value: number): number {
  if (value <= 0) {
    throw new Error("Cannot take logarithm of zero or negative number");
  }
  return Math.log(value);
}

// Exponential (e^x)
export function exp(value: number): number {
  return Math.exp(value);
}

// 10^x
export function pow10(value: number): number {
  return Math.pow(10, value);
}

// Absolute value
export function abs(value: number): number {
  return Math.abs(value);
}

// Hyperbolic sine
export function sinh(value: number): number {
  return Math.sinh(value);
}

// Hyperbolic cosine
export function cosh(value: number): number {
  return Math.cosh(value);
}

// Hyperbolic tangent
export function tanh(value: number): number {
  return Math.tanh(value);
}

// Inverse hyperbolic sine
export function asinh(value: number): number {
  return Math.asinh(value);
}

// Inverse hyperbolic cosine
export function acosh(value: number): number {
  if (value < 1) {
    throw new Error("Inverse hyperbolic cosine input must be >= 1");
  }
  return Math.acosh(value);
}

// Inverse hyperbolic tangent
export function atanh(value: number): number {
  if (value <= -1 || value >= 1) {
    throw new Error(
      "Inverse hyperbolic tangent input must be between -1 and 1",
    );
  }
  return Math.atanh(value);
}

// Convert number to binary
export function toBinary(value: number): string {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error("Binary conversion requires non-negative integer");
  }
  return value.toString(2);
}

// Convert number to octal
export function toOctal(value: number): string {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error("Octal conversion requires non-negative integer");
  }
  return value.toString(8);
}

// Convert number to hexadecimal
export function toHexadecimal(value: number): string {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error("Hexadecimal conversion requires non-negative integer");
  }
  return value.toString(16).toUpperCase();
}

// Parse binary string to number
export function fromBinary(binary: string): number {
  if (!/^[01]+$/.test(binary)) {
    throw new Error("Invalid binary representation");
  }
  return parseInt(binary, 2);
}

// Parse octal string to number
export function fromOctal(octal: string): number {
  if (!/^[0-7]+$/.test(octal)) {
    throw new Error("Invalid octal representation");
  }
  return parseInt(octal, 8);
}

// Parse hexadecimal string to number
export function fromHexadecimal(hex: string): number {
  if (!/^[0-9A-Fa-f]+$/.test(hex)) {
    throw new Error("Invalid hexadecimal representation");
  }
  return parseInt(hex, 16);
}

// Format number with thousand separators and proper scientific notation
export function formatNumber(value: number | Decimal): string {
  const decimalValue = value instanceof Decimal ? value : new Decimal(value);

  // Check if scientific notation is needed
  if (
    decimalValue.abs().gte(1e10) ||
    (decimalValue.abs().lt(1e-7) && !decimalValue.isZero())
  ) {
    return decimalValue.toExponential(10);
  }

  // Format with thousand separators
  const valueStr = decimalValue.toString();
  const parts = valueStr.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

// Mathematical constants
export const CONSTANTS = {
  PI: Math.PI,
  E: Math.E,
  AVOGADRO: 6.02214076e23,
  BOLTZMANN: 1.380649e-23,
  ELECTRON_MASS: 9.1093837015e-31,
  PLANCK: 6.62607015e-34,
  SPEED_OF_LIGHT: 299792458,
  GRAVITY: 9.80665,
};
