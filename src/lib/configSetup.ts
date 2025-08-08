import {
  BaseDirectory,
  exists,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/plugin-fs";
import { Config, Macro } from "./store";
import { defaultConfig, defaultMacros } from "./defaults";

type configMacrosFile = {
  setMacros: (macros: Macro[]) => void
  setConfig: (config: Config) => void
}

export const configMacrosFile = async ({setMacros, setConfig}: configMacrosFile) => {

  getConfigFile(setConfig);

  let macrosFileExists = await exists("macrokeys.json", {
    baseDir: BaseDirectory.AppData,
  });

  if (macrosFileExists) {
    let macrosFile = await readTextFile("macrokeys.json", {
      baseDir: BaseDirectory.AppData,
    });

    console.log(JSON.parse(macrosFile));
    setMacros(JSON.parse(macrosFile));
  } else {
    console.log("Could not find macrokeys.json, creating file");
    await writeTextFile("macrokeys.json", JSON.stringify(defaultMacros), {
      baseDir: BaseDirectory.AppData,
    });
  }
};

const getConfigFile = async (setConfig: (config: Config) => void) => {

  let configFileExists = await exists("config.json", {
    baseDir: BaseDirectory.AppData,
  });

  let currentConfig: Config;

  if (configFileExists) {
    let configFile = await readTextFile("config.json", {
      baseDir: BaseDirectory.AppData,
    });

    currentConfig = JSON.parse(configFile);
  } else {
    currentConfig = defaultConfig;
    await writeTextFile(
      "config.json",
      JSON.stringify(currentConfig, null, "\t"),
      {
        baseDir: BaseDirectory.AppConfig,
      }
    );
  }

  setConfig(currentConfig);
};
