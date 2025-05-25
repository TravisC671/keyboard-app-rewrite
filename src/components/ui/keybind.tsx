import React, { useEffect, useState } from "react";
import { Button } from "./button";

export function Keybind() {
  const [keys, setKeys] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    setKeys([]);
    setIsRecording(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      if (!isRecording) return;

      console.log(e.key);

      if (!keys.includes(e.key)) {
        setKeys((prev) => [...prev, e.key]);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();

      if (isRecording) {
        setIsRecording(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (
    <div className="flex flex-col space-y-1">
      <h3 className="text-lg pl-1 font-medium">Create Keybind</h3>
      <Button variant={"outline"} className="w-min" onClick={startRecording}>
        Record Keybind
      </Button>
      <KeyCombo keys={keys} />
    </div>
  );
}

//chat gpt, I rlly like this solution though
function KeyCombo({ keys }: { keys: string[] }) {
  return (
    <span>
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          <code
            style={{
              backgroundColor: "#2f3136",
              color: "#ffffff",
              fontFamily: "monospace",
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            {key}
          </code>
          {index < keys.length - 1 && <span> + </span>}
        </React.Fragment>
      ))}
    </span>
  );
}
