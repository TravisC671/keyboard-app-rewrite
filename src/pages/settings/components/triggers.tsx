import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { open } from "@tauri-apps/plugin-dialog";
import React, { useEffect, useState } from "react";

export function Keybind() {
  const [keys, setKeys] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    setKeys([]);
    setIsRecording(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isRecording) return;

      e.preventDefault();

      if (!keys.includes(e.key)) {
        setKeys((prev) => [...prev, e.key]);
      }
    };

    const handleKeyUp = () => {
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
      <h3 className="text-base pl-1 font-medium">Create Keybind</h3>
      <p className="text-sm pl-1 text-muted-foreground">
        When recording, hold a key or combo (e.g., Ctrl or Ctrl+Shift). Letting
        go will stop the recording
      </p>
      <Button
        variant={isRecording ? "destructive" : "outline"}
        className="w-min"
        onClick={startRecording}
      >
        {isRecording ? "Recording..." : "Record Keybind"}
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
          <code className="bg-[#2f3136] font-mono px-[6px] py-[2px] rounded-md">
            {key}
          </code>
          {index < keys.length - 1 && <span> + </span>}
        </React.Fragment>
      ))}
    </span>
  );
}

export function Script() {
  //since we can't access the path I'll make a button to open the script
  const [fileName, setFileName] = useState<string | undefined>();
  const openFile = async () => {
    const filePath = await open({
      multiple: false,
      directory: false,
    });

    if (filePath) {
      let fileSplit = filePath.split("\\");
      setFileName(fileSplit[fileSplit.length - 1]);
    }
  };

  return (
    <div className="space-y-1">
      <h3 className="text-base pl-1 font-medium">Select Script</h3>
      <p className="text-sm pl-1 text-muted-foreground">
        Select a script that will be run when the action is triggered
      </p>
      <Button variant={"outline"} onClick={openFile}>
        Select File
      </Button>
      {fileName && (
        <>
          <p className="text-sm pl-1 text-muted-foreground">
            {"Selected script: "}
          </p>
          <code className="truncate max-w-full text-sm pl-1 text-muted-foreground bg-[#2f3136] font-mono px-[6px] py-[2px] rounded-md">
            {fileName}
          </code>
        </>
      )}
    </div>
  );
}

export function Command() {
  return (
    <div>
      <h3 className="text-base pl-1 font-medium">Enter Command</h3>
      <p className="text-sm pl-1 text-muted-foreground">
        Command will be put in powershell on windows and bash in linux (idk if
        this is right, change later)
      </p>
      <Input />
    </div>
  );
}
