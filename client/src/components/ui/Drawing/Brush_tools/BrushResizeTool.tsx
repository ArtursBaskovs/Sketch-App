import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import { setBrushSize, setEraserBrushSize } from "../../../../store/canvas/toolsSlice";


interface ToolHandlers {
  handlerName: string;
  sizeValue: number;
  decrement: () => void;
  increment: () => void;
  input: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BrushResizeTool: React.FC = () => {
    const dispatch = useDispatch();
    const brushSize = useSelector((state: RootState) => state.tools.brushSize);

    const brushMode = useSelector((state: RootState) => state.tools.brushMode);
    const eraserBrushSize = useSelector((state: RootState) => state.tools.eraserBrushSize);


    
    const brushHandlers: ToolHandlers = {
        handlerName: "brush",
        sizeValue: brushSize,
        decrement: () => dispatch(setBrushSize(brushSize - 0.5)),
        increment: () => dispatch(setBrushSize(brushSize + 0.5)),
        input: (e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setBrushSize(Number(e.target.value))),
    };

    const eraserHandlers: ToolHandlers = {
        handlerName: "eraser",
        sizeValue: eraserBrushSize,
        decrement: () => dispatch(setEraserBrushSize(eraserBrushSize - 1)),
        increment: () => dispatch(setEraserBrushSize(eraserBrushSize + 1)),
        input: (e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setEraserBrushSize(Number(e.target.value))),
    };

    const currentHandlerMode: ToolHandlers = brushMode === "destination-out" ? eraserHandlers : brushHandlers;


    return (
        <>
        <div className="BRUSH_SIZE_CONFIG flex flex-col items-start gap-5">
            <div className="flex flex-row w-full">
                <label htmlFor="brushSize" className="flex-1 text-2xl text-highlightColor">
                    Minimal {currentHandlerMode.handlerName} size
                </label>
                <div className="flex flex-row gap-1 items-center ">
                    <button 
                        className=" text-amber-200 text-2xl hover:text-amber-50 cursor-pointer"
                        onClick={currentHandlerMode.decrement}
                    >-</button>
                    <input 
                        className=" text-center text-amber-200 w-14 hover:text-amber-50 cursor-pointer
                            [&::-webkit-outer-spin-button]:appearance-none 
                            [&::-webkit-inner-spin-button]:appearance-none 
                            [appearance:textfield]
                            focus:outline-none
                            focus:ring-0
                            text-2xl
                        "
                        value={currentHandlerMode.sizeValue}
                        onChange={currentHandlerMode.input}
                        type="number" 
                    />
                    <button 
                        className="text-amber-200 text-2xl hover:text-amber-50 cursor-pointer"
                        onClick={currentHandlerMode.increment}
                    >+</button>
                </div>

            </div>
            <div className="flex flex-col justify-center items-center gap-1">
                <input 
                    type="range" 
                    min="0" max="100" 
                    value={currentHandlerMode.sizeValue}
                    onChange={currentHandlerMode.input}
                    className="w-74 h-4 bg-neutral-900 rounded-lg appearance-none 
                    cursor-pointer input-thumb
                    " 
                />
            </div>
        </div>
        </>
    )
}