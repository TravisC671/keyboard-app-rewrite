import { useState } from "react";
import settings from "../../lib/testdata.json";
import { MacroBtn } from "@/components/macro-btn";
import { FormattedDateTime } from "@/lib/utils";
import { emptyMacro } from "@/lib/constants";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { SlidingUnderlineTabs } from "./components/sliding-underline-tabs";

export function MacroSettings() {
  let { keyindex } = useParams();

  let index = parseInt(keyindex ?? "0");
  const macro =
    settings.macros.find((selMacro) => selMacro.id === index) ?? emptyMacro;
  const [colorFrom, setColorFrom] = useState(macro.gradient.from);
  const [colorTo, setColorTo] = useState(macro.gradient.to);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  if (!macro) {
    return;
  }

  //tabs with one that changes appearance and one that changes macro function
  return (
    <main className="grid max-w-2xl grid-cols-[250px_500px] h-screen">
      <div className="flex justify-center mt-14 col-start-1">
        <MacroBtn
          imageUrl={imageUrl}
          disableHover
          gradientFrom={colorFrom}
          gradientTo={colorTo}
          name={macro.name}
          className="h-40 w-40"
        ></MacroBtn>
      </div>
      <div className="w-[500px] mt-3 col-start-2">
        <SlidingUnderlineTabs
          colorFrom={colorFrom}
          setColorFrom={setColorFrom}
          colorTo={colorTo}
          setColorTo={setColorTo}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
        />
      </div>
      <div className="absolute bottom-10 right-10">
        <Button
          className="w-[150px] text-base"
          onClick={() =>
            toast("Macro Has been saved", {
              description: FormattedDateTime(),
            })
          }
        >
          Save Macro
        </Button>
      </div>
      <Toaster position="bottom-left" />
    </main>
  );
}
