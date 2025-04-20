import { Calculator } from "@/components/Calculator/Calculator";
import { ThemeProvider } from "next-themes";

const Index = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <div className="w-full max-w-xl">
          <Calculator />
        </div>
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>EquationVerse Calculator © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
