import React, { useState } from "react";
import { Input } from "./input";
import { Slider } from "./slider";

type UncappedSliderFn = {
  actionHoldTime: number;
  setActionHoldTime: React.Dispatch<React.SetStateAction<number>>;
};
export function UncappedSlider({
  actionHoldTime,
  setActionHoldTime,
}: UncappedSliderFn) {
  const [value, setValue] = useState(actionHoldTime);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActionHoldTime(parseInt(e.target.value));
    setValue(parseInt(e.target.value));
  };

  return (
    <div className="flex gap-2">
      <Slider
        min={0}
        max={1000}
        step={25}
        value={[Math.min(value, 1000)]}
        onValueChange={(val) => setValue(val[0])}
        onValueCommit={(val) => setActionHoldTime(val[0])}
      />
      <Input
        className="w-26"
        min={0}
        type="number"
        value={value}
        step={50}
        onChange={handleInputChange}
      />
    </div>
  );
}
