import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function ColorPicker() {
  const [color, setColor] = useState("#aabbcc");

  const handleChange = (newColor: string) => {
    setColor(newColor);
    //  Perform actions with the new color here, such as
    //  updating a preview, changing UI elements, etc.
    console.log("color:", newColor);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button style={{ backgroundColor: color }} />
      </PopoverTrigger>
      <PopoverContent>
        <HexColorPicker color={color} onChange={handleChange} />
      </PopoverContent>
    </Popover>
  );
}
