import { MacroBtn } from "./components/macro-btn";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
import { emptyMacro } from "./lib/constants";
import settings from "./lib/testdata.json";
import { MacroSettings } from "./pages/Settings";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router";

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

function Gallery() {
  const btnCount = settings.layout.width * settings.layout.height;
  let navigate = useNavigate();
  let macros = [];

  for (let i = 0; i < btnCount; i++) {
    if (settings.macros[i]) {
      macros.push(settings.macros[i]);
    } else {
      macros.push(emptyMacro);
    }
  }

  const handleBtnPress = (index: number) => {
    navigate(`/settings/${index}`);
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div
        className={`grid gap-3`}
        style={{
          gridTemplateRows: `repeat(${settings.layout.height}, 128px)`,
          gridTemplateColumns: `repeat(${settings.layout.width}, 128px)`,
        }}
      >
        {macros.map((macro, index) => (
          <MacroBtn
            key={`macroBtn${index}`}
            gradientFrom={macro.gradient.from}
            gradientTo={macro.gradient.to}
            name={macro.name}
            imageUrl={macro.image}
            className="h-32 w-32"
            onClick={() => handleBtnPress(index)}
          ></MacroBtn>
        ))}
      </div>
    </main>
  );
}

export default App;
