import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import { setBrushSize, setEraserBrushSize } from "../../../../store/canvas/toolsSlice";
import { useEffect, useState } from "react";


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

    const [localBrushSizeState, setLocalBrushSizeState] = useState(brushSize);
    const [localEraserSizeState, setLocalEraserSizeState] = useState(eraserBrushSize);
    
    const brushHandlers: ToolHandlers = {
        handlerName: "brush",
        sizeValue: localBrushSizeState,
        decrement: () => setLocalBrushSizeState(prev => {
            if(prev <= 0) return prev;
            return prev - 0.5;
        }),
        increment: () => setLocalBrushSizeState(prev => {
            if(prev >= 100) return prev;
            return prev + 0.5;
        }),
        input: (e: React.ChangeEvent<HTMLInputElement>) =>
            setLocalBrushSizeState(Number(e.target.value)),
    };

    const eraserHandlers: ToolHandlers = {
        handlerName: "eraser",
        sizeValue: localEraserSizeState,
        decrement: () => setLocalEraserSizeState(prev => {
            if(prev < 0) return prev;
            return prev - 0.5;
        }),
        increment: () => setLocalEraserSizeState(prev => {
            if(prev > 100) return prev;
            return prev + 0.5;
        }),
        input: (e: React.ChangeEvent<HTMLInputElement>) =>
            setLocalEraserSizeState(Number(e.target.value)),
    };

    const currentHandlerMode: ToolHandlers = brushMode === "destination-out" ? eraserHandlers : brushHandlers;


    //to avoid extra canvas rerenders because of redux. so i use local state first then update global states
    //important mostly for slider inputs, because they cause many renders
    useEffect(() => { 
        const reduxDispatchThrottleTime = setTimeout(() => {
            dispatch(setBrushSize(localBrushSizeState));
            dispatch(setEraserBrushSize(localEraserSizeState))
        }, 300);
        return () => clearTimeout(reduxDispatchThrottleTime);
    }, [localBrushSizeState, localEraserSizeState])


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