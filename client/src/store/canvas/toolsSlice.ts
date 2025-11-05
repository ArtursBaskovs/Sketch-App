import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ToolsState {
    brushSize: number,
    brushPressureMultiplier: number,
    brushForm: CanvasLineCap,
    brushColor: string,
    brushMode: GlobalCompositeOperation,
    eraserBrushSize: number,
}
const initialState: ToolsState = {
    brushSize: 4,
    brushPressureMultiplier: 4,
    brushForm: "round",
    brushColor: "#000000",
    brushMode: "source-over",
    eraserBrushSize: 40,
}

export const toolsSlice = createSlice({
    name: "tools",
    initialState,
    reducers: {
        setBrushSize: (state, action: PayloadAction<number>) => {
            if(action.payload > 100 || action.payload < 0) return;
            state.brushSize = action.payload;
        },
        setBrushPressureMultiplier: (state, action: PayloadAction<number>) => {
            if(action.payload > 20 || action.payload < 0) return;
            state.brushPressureMultiplier = action.payload;
        },
        setBrushForm: (state, action: PayloadAction<CanvasLineCap>) => {
            state.brushForm = action.payload;
        },
        setBrushColor: (state, action: PayloadAction<string>) => {
            state.brushColor = action.payload;
        },
        switchBrushMode: (state) => {
            state.brushMode = state.brushMode === "source-over" ? "destination-out" : "source-over";
        },
        setEraserBrushSize: (state, action: PayloadAction<number>) => {
            state.eraserBrushSize = action.payload;
        }
    }
});

export const { 
    setBrushSize, 
    setBrushPressureMultiplier, 
    setBrushForm,
    setBrushColor,
    switchBrushMode,
    setEraserBrushSize
} = toolsSlice.actions;

export default toolsSlice.reducer;
