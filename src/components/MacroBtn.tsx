import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type MacroBtnFn = {
  gradientFrom: string;
  gradientTo: string;
  name: string;
  className: string;
};
export function MacroBtn({
  gradientFrom,
  gradientTo,
  name,
  className,
}: MacroBtnFn) {
  return (
    <Button
      className={cn(`hover:scale-110 ease-in`, className)}
      style={{
        backgroundImage: `linear-gradient(to top right, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      {name}
    </Button>
  );
}
