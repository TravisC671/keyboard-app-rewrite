import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type MacroBtnFn = {
  gradientFrom: string;
  gradientTo: string;
  name: string;
  className: string;
  imageUrl: string | undefined;
  disableHover?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
export function MacroBtn({
  gradientFrom,
  gradientTo,
  name,
  className,
  imageUrl,
  disableHover = false,
  onClick,
}: MacroBtnFn) {
  console.log(imageUrl);
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
