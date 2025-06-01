import { ColorPicker } from "@/components/ui/color-picker";
import { ImageInput } from "@/components/ui/image-input";
import { Input } from "@/components/ui/input";
import {
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/sliding-underline-tabs";
import { Tabs } from "@/components/ui/tabs";
import { ReactSetStateString } from "@/lib/utils";
import { Action } from "./action";
import { useEffect, useRef, useState } from "react";

//https://v0.dev/chat/restyling-shadcn-tabs-z4p1nL6Sgjx#asmyDYyS6m7jlGCeDrI4WbxVBOjLunXF
type SlidingUnderlineTabs = {
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
}: SlidingUnderlineTabs) {
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
        <Action />
      </TabsContent>
    </Tabs>
  );
}
