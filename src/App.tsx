import { useEffect } from "react";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
import { Gallery } from "./pages/gallery/Gallery";
import { MacroSettings } from "./pages/settings/Settings";
import { BrowserRouter, Route, Routes } from "react-router";
import { configMacrosFile } from "./lib/configSetup";
import { useMacroStore } from "./lib/store";


function App() {
  const setMacros = useMacroStore((state) => state.setMacros);
  const setConfig = useMacroStore((state) => state.setConfig);

  useEffect(() => {
    configMacrosFile({setMacros, setConfig})
  }, [])

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
