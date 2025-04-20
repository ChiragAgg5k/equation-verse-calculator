# EquationVerse Calculator 🧮✨

## Overview

EquationVerse is a powerful, feature-rich calculator application built with modern web technologies. It offers both basic and scientific calculation modes, providing a seamless and intuitive mathematical computing experience.

## 🚀 Features

### Calculator Modes

- **Basic Mode**: Perform standard arithmetic operations
- **Scientific Mode**: Advanced calculations with trigonometric, logarithmic, and exponential functions

### Key Functionalities

- Memory operations (M+, M-, MR, MC)
- Percentage calculations
- Sign toggling
- Keyboard shortcut support
- Calculation history
- Theme switching (Light/Dark modes)

## 🛠 Technologies Used

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Custom React hooks
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🔧 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or Bun

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd equation-verse-calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🌈 Usage

### Basic Operations

- Addition, subtraction, multiplication, division
- Percentage calculations
- Memory function recalls

### Scientific Functions

- Trigonometric calculations (sin, cos, tan)
- Logarithmic functions
- Exponential operations
- Angle mode switching (DEG, RAD, GRAD)

## 🎨 Themes

The calculator supports both light and dark themes, providing a comfortable viewing experience in different environments.

## 🤖 Keyboard Shortcuts

- `Esc`: Clear all
- Numeric keys: Input numbers
- `+`, `-`, `*`, `/`: Perform operations
- `Enter`: Calculate result

## 📦 Project Structure

```
src/
├── components/
│   └── Calculator/
│       ├── BasicKeypad.tsx
│       ├── ScientificKeypad.tsx
│       └── Calculator.tsx
├── hooks/
│   └── useCalculator.ts
└── utils/
    └── mathOperations.ts
```
