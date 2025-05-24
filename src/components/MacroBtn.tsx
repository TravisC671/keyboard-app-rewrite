import { Button } from "./ui/button";

type MacroBtnFn = {
  gradientFrom: string;
  gradientTo: string;
  name: string;
  width: string;
  height: string;
};
export function MacroBtn({
  gradientFrom,
  gradientTo,
  name,
  width,
  height,
}: MacroBtnFn) {
  return (
    <Button
      className={`hover:scale-110 ease-in ${width} ${height}`}
      style={{
        backgroundImage: `linear-gradient(to top right, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      {name}
    </Button>
  );
}
