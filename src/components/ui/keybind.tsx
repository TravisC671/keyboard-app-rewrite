import { useState } from "react";
import { Button } from "./button";

export function Keybind() {
  const [keys, setKeys] = useState(["ctrl", "alt", "delete"]);

  const MacroKeys = () => {
    keys.map((key, index) => (
        
    ))
  }

  return (
    <div>
      <h3 className="text-lg pl-1 font-medium">Create Keybind</h3>
      <Button variant={"outline"}>Record Keybind</Button>
    </div>
  );
}
