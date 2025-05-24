import { useEffect, useRef, useState } from "react";
import { MacroBtn } from "./components/MacroBtn";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
import { emptyMacro } from "./lib/constants";
import settings from "./lib/testdata.json";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/sliding-underline-tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { NameInput } from "./components/ui/name-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MacroSettings selectedMacroIndex={0} />
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
          <MacroBtn
            key={`macroBtn${index}`}
            gradientFrom={macro.gradient.from}
            gradientTo={macro.gradient.to}
            name={macro.name}
            className="h-32 w-32"
          ></MacroBtn>
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
    <main className="grid max-w-2xl grid-cols-[1fr_1fr] h-screen">
      <div className="flex-3 flex justify-center mt-14">
        <MacroBtn
          gradientFrom={macro.gradient.from}
          gradientTo={macro.gradient.to}
          name={macro.name}
          className="h-40 w-40"
        ></MacroBtn>
      </div>
      <div className="w-[400px] mt-3">
        <SlidingUnderlineTabs />
      </div>
    </main>
  );
}

//https://v0.dev/chat/restyling-shadcn-tabs-z4p1nL6Sgjx#asmyDYyS6m7jlGCeDrI4WbxVBOjLunXF
export function SlidingUnderlineTabs() {
  const [activeTab, setActiveTab] = useState("account");
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [underlineLeft, setUnderlineLeft] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeTabElement = tabsRef.current.find(
      (tab) => tab?.getAttribute("data-state") === "active"
    );
    if (activeTabElement) {
      setUnderlineWidth(activeTabElement.offsetWidth);
      setUnderlineLeft(activeTabElement.offsetLeft);
    }
  }, [activeTab]);

  return (
    <Tabs
      defaultValue="appearance"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full h-full"
    >
      <TabsList className="justify-start border-b border-border">
        <TabsTrigger value="appearance" ref={(el) => (tabsRef.current[0] = el)}>
          Appearance
        </TabsTrigger>
        <TabsTrigger value="Macro" ref={(el) => (tabsRef.current[1] = el)}>
          Macro
        </TabsTrigger>
        <div
          className="absolute bottom-0 h-0.5 bg-primary duration-200"
          style={{ left: underlineLeft, width: underlineWidth }}
        ></div>
      </TabsList>
      <TabsContent value="appearance" className="mt-4">
        <Card>
          <CardContent>
            <div className="space-y-1">
              <NameInput defaultValue={"Open Terminal"} />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="Macro" className="mt-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Password Settings</h3>
          <p className="text-sm text-muted-foreground">
            Change your password and security preferences.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}

function Action() {
  return (
    <Card>
      <CardContent>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}

export default App;
