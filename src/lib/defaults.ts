import { Config, Macro } from "./store";


export const defaultConfig: Config = {
    dimmensions: {
        width: 4,
        height: 2
    }
}

let keyAmt = defaultConfig.dimmensions.width * defaultConfig.dimmensions.height

export const defaultMacros: Macro[] = Array.from({length: keyAmt}, (_, i) => ({
  id: i,
  name: "",
  actionType: "hold",
  actionConfig: {
    holdDurationMs: 0,
    multiTapCount: 0,
    multiTapIntervalMs: 0,
  },
  triggerType: "command",
  triggerConfig: {
    keys: [],
    command: '',
    script: '',
  },
  gradient: {
    from: '',
    to: '',
  },
  image: '',
}))