export interface KeyBind {
  modifier: string;
  key: string;
  description: string;
}

export const keyBinds = {
  brushActions: {
    incrementBrushSize: { modifier: "", key: "]", description: "Increase brush size" },
    decrementBrushSize: { modifier: "", key: "[", description: "Decrease brush size" },
    switchToEraser: { modifier: "", key: "e", description: "Switch to eraser mode" },
    switchToBrush: { modifier: "", key: "b", description: "Switch to brush mode" },
  },
  canvas: {
    undo: { modifier: "Control", key: "z", description: "Undo shape" },
    redo: { modifier: "Control", key: "y", description: "Redo shape" },
  },
} satisfies Record<string, Record<string, KeyBind>>;
