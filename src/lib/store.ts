import { create } from "zustand";

export type Macro = {
  id: number;
  name: string;
  actionType: "hold" | "tap" | "multiTap";
  actionConfig: {
    holdDurationMs: number;
    multiTapCount: number;
    multiTapIntervalMs: number;
  };
  triggerType: "keybind" | "command" | "script";
  triggerConfig: {
    keys: string[];
    command: string;
    script: string;
  };
  gradient: {
    from: string;
    to: string;
  };
  image: string;
};

export type Config = {
  dimmensions: {
    width: number;
    height: number;
  };
};

type MacroStore = {
  macros: Macro[];
  selectedId: number | null;
  config: Config;
  setSelectedId: (id: number) => void;
  setConfig: (config: Config) => void;
  setMacros: (macros: Macro[]) => void;
  updateSelectedMacro: (updates: Partial<Macro>) => void;
};

export const useMacroStore = create<MacroStore>((set, get) => ({
  macros: [],
  selectedId: null,
  config: {
    dimmensions: {
      width: 0,
      height: 0
    }
  },

  setSelectedId: (id) => set({ selectedId: id }),
  setConfig: (config) => set({ config: config }),

  setMacros: (macros) => set({ macros: macros }),

  updateSelectedMacro: (updates) => {
    const { macros, selectedId } = get();
    if (selectedId === null) return;

    const updated = macros.map((m) => {
      return m.id === selectedId ? { ...m, updates } : m;
    });

    set({ macros: updated });
  },
}));
