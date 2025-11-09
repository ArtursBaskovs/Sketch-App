import type { BrushType } from "./brushTypes";

export interface Lines {
    tool: GlobalCompositeOperation;
    strokeWidth: number;
    eraserWidth: number;
    color: string;
    brush: BrushType;
    points: number[];
    hasBrushShadow: boolean;
    shadowSize: number;
}  