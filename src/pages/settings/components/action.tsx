import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UncappedSlider } from "@/components/ui/uncapped-slider";
import { useState } from "react";
import { Command, Keybind, Script } from "./triggers";

export function Action() {
  const [actionType, setActionType] = useState("tap");
  const [actionTrigger, setActionTrigger] = useState("keybind");
  const [actionHoldTime, setActionHoldTime] = useState(0);

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
        <ActionSettings
          actionType={actionType}
          actionHoldTime={actionHoldTime}
          setActionHoldTime={setActionHoldTime}
        />
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
        <TriggerAction actionTrigger={actionTrigger} />
      </CardContent>
    </Card>
  );
}

type ActionSettings = {
  actionType: string;
  actionHoldTime: number;
  setActionHoldTime: React.Dispatch<React.SetStateAction<number>>;
};
function ActionSettings({
  actionType,
  actionHoldTime,
  setActionHoldTime,
}: ActionSettings) {
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
}

type TriggerAction = {
  actionTrigger: string;
};
function TriggerAction({ actionTrigger }: TriggerAction) {
  switch (actionTrigger) {
    case "keybind":
      return <Keybind />;
    case "script":
      return <Script />;
    case "command":
      return <Command />;
    default:
      return <></>;
  }
}
