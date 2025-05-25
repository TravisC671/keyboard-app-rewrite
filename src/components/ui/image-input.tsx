import { cn } from "@/lib/utils";
import { Input } from "./input";

type ImageInputFn = {
  className: string;
  imageUrl: string | undefined;
  setImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
};
export function ImageInput({ className, imageUrl, setImageUrl }: ImageInputFn) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);

      console.log("added:", file.name, url);
    }
  };

  return (
    <Input
      type="file"
      accept="image/*"
      className={cn(className)}
      onChange={handleFileChange}
    />
  );
}
