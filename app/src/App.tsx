import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";
import "./index.css";
import { emptyMacro } from "./lib/constants";
import settings from "./lib/testdata.json";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Gallery />
    </ThemeProvider>
  );
}

function Gallery() {
  const btnCount = settings.layout.width * settings.layout.height;

  let macros = [];

  for (let i = 0; i < btnCount; i++) {
    if (settings.macros[i]) {
      macros.push(settings.macros[i]);
    } else {
      macros.push(emptyMacro);
    }
  }

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
          <Button
            key={`macro${index}`}
            className={`h-32 w-32 hover:scale-110 ease-in `}
            style={{
              backgroundImage: `linear-gradient(to top right, ${macro.gradient.from}, ${macro.gradient.to})`,
            }}
          >
            {macro.name}
          </Button>
        ))}
      </div>
    </main>
  );
}

type MacroSettingsFn = {
  selectedMacroIndex: number;
};
function MacroSettings({ selectedMacroIndex }: MacroSettingsFn) {
  const macro = settings.macros[selectedMacroIndex];

  if (!macro) {
    return;
  }

  //tabs with one that changes appearance and one that changes macro function
  return (
    <main>
      <div></div>
      <div></div>
    </main>
  );
}

export default App;
