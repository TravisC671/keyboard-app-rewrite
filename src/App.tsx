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
import { ColorPicker } from "./components/ui/color-picker";
import { ImageInput } from "./components/ui/image-input";
import { ReactSetStateString } from "./lib/utils";

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
            imageUrl={macro.image}
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
  const [colorFrom, setColorFrom] = useState(emptyMacro.gradient.from);
  const [colorTo, setColorTo] = useState(emptyMacro.gradient.to);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    setColorFrom(macro.gradient.from);
    setColorTo(macro.gradient.to);
  }, []);

  if (!macro) {
    return;
  }

  //tabs with one that changes appearance and one that changes macro function
  return (
    <main className="grid max-w-2xl grid-cols-[1fr_1fr] h-screen">
      <div className="flex-3 flex justify-center mt-14">
        <MacroBtn
          imageUrl={imageUrl}
          disableHover
          gradientFrom={colorFrom}
          gradientTo={colorTo}
          name={macro.name}
          className="h-40 w-40"
        ></MacroBtn>
      </div>
      <div className="w-[400px] mt-3">
        <SlidingUnderlineTabs
          colorFrom={colorFrom}
          setColorFrom={setColorFrom}
          colorTo={colorTo}
          setColorTo={setColorTo}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
        />
      </div>
    </main>
  );
}

//https://v0.dev/chat/restyling-shadcn-tabs-z4p1nL6Sgjx#asmyDYyS6m7jlGCeDrI4WbxVBOjLunXF
type SlidingUnderlineTabsFn = {
  colorFrom: string;
  setColorFrom: ReactSetStateString;
  colorTo: string;
  setColorTo: ReactSetStateString;
  imageUrl: string | undefined;
  setImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
};
export function SlidingUnderlineTabs({
  colorFrom,
  setColorFrom,
  colorTo,
  setColorTo,
  imageUrl,
  setImageUrl,
}: SlidingUnderlineTabsFn) {
  const [activeTab, setActiveTab] = useState("appearance");
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
        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-lg font-medium">Macro Button Appearance</h3>
            <p className="text-sm text-muted-foreground">
              For anything not related to the functionality of the macro
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-medium">Macro Name</h3>
            <Input defaultValue={"Open Terminal"} className="w-[60%]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-medium">Macro Gradient</h3>
            <div
              className=" w-[80%] h-9 rounded-sm"
              style={{
                backgroundImage: `linear-gradient(to right, ${colorFrom}, ${colorTo})`,
              }}
            ></div>
            <div className="flex justify-between w-[80%]">
              <ColorPicker color={colorFrom} setColor={setColorFrom} />
              <ColorPicker color={colorTo} setColor={setColorTo} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-medium">Macro Button Image</h3>
            <ImageInput
              className="w-[50%]"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
            />
          </div>
        </div>
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
