import { writeFile, BaseDirectory, open } from "@tauri-apps/plugin-fs";

export async function saveUserImage(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

  await writeFile(`userimgs/${file.name}`, bytes, {
    baseDir: BaseDirectory.AppConfig,
  });

  console.log("Image saved to app data");
}

export async function readUserImage(fileName: string) {
  const file = await open(`userimgs/${fileName}`, {
    read: true,
    baseDir: BaseDirectory.AppData,
  });

  const stat = await file.stat();
  const buf = new Uint8Array(stat.size);
  await file.read(buf);
  const blob = new Blob([buf], { type: "image/png" });
  const url = URL.createObjectURL(blob);
  await file.close();
  return url;
}
