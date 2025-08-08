import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useMacroStore } from "@/lib/store";
import { useShallow } from 'zustand/react/shallow';

type MacroBtnFn = {
  name: string;
  className: string;
  imageUrl: string | undefined;
  disableHover?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
export function MacroBtn({
  name,
  className,
  imageUrl,
  disableHover = false,
  onClick,
}: MacroBtnFn) {

  const {macroIndex, macro} = useMacroStore(useShallow((state) => {macroIndex: state.selectedId,macro: state.macros }))
  const macroStore = useMacroStore((state) => state.macros)

  if (macroIndex == null) {
    return <>index is wrong</>
  }

  const macro = macroStore[macroIndex]
  
  return (
    <Button
      onClick={onClick}
      className={cn(
        ` ${!disableHover && "hover:scale-110"} ease-in`,
        className
      )}
      style={{
        backgroundImage: `linear-gradient(to top right, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      <div className="flex flex-col font-bold font-[Geist-Bold]">
        {imageUrl !== "" ? (
          <img src={imageUrl} alt={`${name}`} />
        ) : (
          <h1>{name}</h1>
        )}
        {/* <h1>{name}</h1> */}
      </div>
    </Button>
  );
}
