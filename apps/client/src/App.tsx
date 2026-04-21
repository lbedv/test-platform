import { RouterProvider } from "@tanstack/react-router"
import { ThemeProvider } from "@/components/theme-provider";
import { router } from "@/routes/router";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

export default App
