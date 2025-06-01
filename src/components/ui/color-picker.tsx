import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./input";

type ColorPickerFn = {
  setColor: React.Dispatch<React.SetStateAction<string>>;
  color: string;
};
export function ColorPicker({ setColor, color }: ColorPickerFn) {
  const handleChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    if (input[0] != "#") {
      setColor(`#${input}`);
    } else {
      setColor(input);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div
          className="w-13 h-8 rounded-sm"
          style={{ backgroundColor: color }}
        ></div>
      </PopoverTrigger>
      <PopoverContent className="w-min" align="start" side="left">
        <HexColorPicker color={color} onChange={handleChange} />
        <Input value={color} onChange={handleInputChange} className="mt-2" />
      </PopoverContent>
    </Popover>
  );
}
