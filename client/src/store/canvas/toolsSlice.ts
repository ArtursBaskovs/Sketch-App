import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BrushType } from "../../types/brushTypes";

export interface ToolsState {
    brushSize: number,
    brushPressureMultiplier: number,
    brushForm: BrushType,
    brushColor: string,
    brushMode: GlobalCompositeOperation,
    eraserBrushSize: number,
    brushShadowSize: number,
    brushShadowEnabled: boolean,
}
const initialState: ToolsState = {
    brushSize: 6,
    brushPressureMultiplier: 4,
    brushForm: "round",
    brushColor: "#000000",
    brushMode: "source-over",
    eraserBrushSize: 6,
    brushShadowSize: 5,
    brushShadowEnabled: false,
}

export const toolsSlice = createSlice({
    name: "tools",
    initialState,
    reducers: {
        setBrushSize: (state, action: PayloadAction<number>) => {
            state.brushSize = action.payload;
        },
        setBrushPressureMultiplier: (state, action: PayloadAction<number>) => {
            if(action.payload > 20 || action.payload < 0) return;
            state.brushPressureMultiplier = action.payload;
        },
        setBrushForm: (state, action: PayloadAction<BrushType>) => {
            state.brushForm = action.payload;
        },
        setBrushColor: (state, action: PayloadAction<string>) => {
            state.brushColor = action.payload;
        },
        switchBrushMode: (state) => {
            state.brushMode = state.brushMode === "source-over" ? "destination-out" : "source-over";
        },
        setBrushModeDraw: (state) => {
            state.brushMode = "source-over";
        },
        setBrushModeErase: (state) => {
            state.brushMode = "destination-out";
        },
        setEraserBrushSize: (state, action: PayloadAction<number>) => {
            state.eraserBrushSize = action.payload;
        },
        setBrushShadowSize: (state, action: PayloadAction<number>) => {
            state.brushShadowSize = action.payload;
        },
        setBrushShadowBool: (state, action: PayloadAction<boolean>) => {
            state.brushShadowEnabled = action.payload;
        },
    }
});

export const { 
    setBrushSize, 
    setBrushPressureMultiplier, 
    setBrushForm,
    setBrushColor,
    switchBrushMode,
    setBrushModeDraw,
    setBrushModeErase,
    setEraserBrushSize,
    setBrushShadowSize,
    setBrushShadowBool

} = toolsSlice.actions;

export default toolsSlice.reducer;
