import { useEffect, useRef, useState } from "react";
import settings from "../lib/testdata.json";
import { MacroBtn } from "@/components/MacroBtn";
import { ReactSetStateString } from "@/lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/sliding-underline-tabs";
import { Input } from "@/components/ui/input";
import { ColorPicker } from "@/components/ui/color-picker";
import { ImageInput } from "@/components/ui/image-input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { emptyMacro } from "@/lib/constants";
import { Slider } from "@/components/ui/slider";
import { UncappedSlider } from "@/components/ui/uncapped-slider";
import { Keybind } from "@/components/ui/keybind";

type MacroSettingsFn = {
  selectedMacroIndex: number;
};
export function MacroSettings({ selectedMacroIndex }: MacroSettingsFn) {
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
            <h3 className="text-lg font-medium">Macro Appearance Settings</h3>
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
        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-lg font-medium">Macro Settings</h3>
            <p className="text-sm text-muted-foreground">
              Change the way the macro behaves
            </p>
          </div>
        </div>
        <Action></Action>
      </TabsContent>
    </Tabs>
  );
}

function Action() {
  const [actionType, setActionType] = useState("tap");
  const [actionTrigger, setActionTrigger] = useState("keybind");
  const [actionHoldTime, setActionHoldTime] = useState(0);

  const ActionSettings = () => {
    switch (actionType) {
      case "tap":
        return (
          <div className="space-y-1">
            <p className="text-sm pl-1 text-muted-foreground">
              Trigger the macro with a single key press.
            </p>
          </div>
        );
      case "hold":
        return (
          <div className="space-y-1">
            <p className="text-sm pl-1 text-muted-foreground">
              Trigger after holding the key for a set duration.
            </p>
            <h3 className="text-base pl-1 font-medium"> Hold Duration (ms)</h3>
            <UncappedSlider
              actionHoldTime={actionHoldTime}
              setActionHoldTime={setActionHoldTime}
            />
          </div>
        );
      case "multi-tap":
        return (
          <div className="space-y-1">
            <p className="text-sm pl-1 text-muted-foreground">
              Trigger after tapping the key multiple times in quick succession.
            </p>
            <h3 className="text-base pl-1 font-medium">Tap Count</h3>
            <Input
              min={2}
              max={10}
              defaultValue={2}
              type="number"
              className="w-[130px]"
            />
          </div>
        );
      default:
        return <></>;
    }
  };

  const ActionTrigger = () => {
    switch (actionTrigger) {
      case "keybind":
        return <Keybind />;
      default:
        return <></>;
    }
  };

  return (
    <Card className="w-[100%] p-4 pt-2">
      <CardContent className="p-0 space-y-3">
        <div className="space-y-1">
          <h3 className="text-lg pl-1 font-medium">Action Mode</h3>
          <Select value={actionType} onValueChange={setActionType}>
            <SelectTrigger className="w-[130px] ">
              <SelectValue placeholder="tap" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tap">Tap</SelectItem>
              <SelectItem value="hold">Hold</SelectItem>
              <SelectItem value="multi-tap">Multi Tap</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ActionSettings />
        <div className="space-y-1">
          <h3 className="text-lg pl-1 font-medium">Trigger Action</h3>
          <Select value={actionTrigger} onValueChange={setActionTrigger}>
            <SelectTrigger className="w-[130px] ">
              <SelectValue placeholder="keybind" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="keybind">Keybind</SelectItem>
              <SelectItem value="script">Script</SelectItem>
              <SelectItem value="command">Command</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Keybind />
      </CardContent>
    </Card>
  );
}
