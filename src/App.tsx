import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
import { Gallery } from "./pages/gallery/Gallery";
import { MacroSettings } from "./pages/settings/Settings";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/settings/:keyindex" element={<MacroSettings />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
