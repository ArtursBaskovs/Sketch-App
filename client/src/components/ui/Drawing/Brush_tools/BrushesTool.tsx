import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import {  setBrushForm, setBrushModeDraw, setBrushModeErase, setBrushShadowBool, setBrushShadowSize, switchBrushMode } from "../../../../store/canvas/toolsSlice";
import useKeyBinds from "../../../../hooks/useKeyBinds";
import { keyBinds } from "../../../../config/keyBinds";

export const BrushesTool: React.FC = () => {
    const brushForm = useSelector((state: RootState) => state.tools.brushForm);
    const brushMode = useSelector((state: RootState) => state.tools.brushMode);
    const toEraserMode = useSelector((state: RootState) => state.tools.brushMode);
    const toBrushMode = useSelector((state: RootState) => state.tools.brushMode);
    const hasBrushShadow = useSelector((state: RootState) => state.tools.brushShadowEnabled);
    const brushShadowSize = useSelector((state: RootState) => state.tools.brushShadowSize);
    const dispatch = useDispatch();


    const increment = () => {
        if(brushShadowSize < 30) {
            dispatch(setBrushShadowSize(brushShadowSize + 1));
        }
        
    };

    const decrement = () => {
        if(brushShadowSize > 0) {
            dispatch(setBrushShadowSize(brushShadowSize - 1));
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if(!isNaN(value)) dispatch(setBrushShadowSize(value));
    };

    // set keybinds
    const {
        action
    } = useKeyBinds();
    action(keyBinds.brushActions.switchToBrush.key, () => dispatch(setBrushModeDraw()));
    action(keyBinds.brushActions.switchToEraser.key, () => dispatch(setBrushModeErase()));

    return (
        <>
            <div className="BRUSHES flex flex-col mt-5 gap-3 items-center">


                <label htmlFor="BrushForm" className="flex-1 text-2xl text-highlightColor self-center">
                    Brushes
                </label>
                <div className="flex flex-row gap-5 items-center">
                    <small className="text-amber-100 font-black">{"<"}{brushForm}{">"}</small>
                    
                </div>


                <div className="flex flex-row flex-wrap gap-2">
                    <button 
                        className="w-10 h-10 bg-amber-100 hover:bg-amber-50 cursor-pointer border-2 text-transparent rounded-full flex items-center justify-center"
                        onClick={() => dispatch(setBrushForm("round"))}
                    >1</button>
                    <button 
                        className="w-10 h-10  text-amber-100 hover:text-amber-50 cursor-pointer rounded-full flex items-center justify-center"
                        onClick={() => dispatch(setBrushForm("dynamic_line"))}
                    >||||||||</button>
                    <button 
                        className="w-10 h-10 bg-amber-100 hover:bg-amber-50 hover:border-amber-50 cursor-pointer  text-transparent flex items-center justify-center"
                        onClick={() => dispatch(setBrushForm("square"))}
                    >1</button>

                </div>

                <label htmlFor="BrushForm" className="flex-1 text-2xl text-highlightColor self-center">
                    Modes
                </label>
                <label className="text-amber-100 text-sm">Brush shadow</label>
                <div className="flex flex-row flex-wrap gap-2">
                    
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={hasBrushShadow}
                        onChange={(e) => dispatch(setBrushShadowBool(e.target.checked))}
                    />
                    <div className="flex flex-row gap-1 items-center ">
                        <button
                            className="text-amber-200 text-2xl hover:text-amber-50 cursor-pointer"
                            onClick={decrement}
                        >
                            -
                        </button>

                        <input
                            className="text-center text-amber-200 w-14 hover:text-amber-50 cursor-pointer
                            [&::-webkit-outer-spin-button]:appearance-none 
                            [&::-webkit-inner-spin-button]:appearance-none 
                            [appearance:textfield]
                            focus:outline-none
                            focus:ring-0
                            text-2xl"
                            type="number"
                            value={brushShadowSize}
                            onChange={handleInput}
                        />

                        <button
                            className="text-amber-200 text-2xl hover:text-amber-50 cursor-pointer"
                            onClick={increment}
                        >
                            +
                        </button>
                    </div>
                    
                    
                </div>
                



                <div className="flex gap-2">
                    <button
                        className={`px-2 py-1 text-sm rounded transition 
                        ${
                            brushMode === "source-over"
                            ? "bg-amber-400 text-black"
                            : "text-amber-100 hover:text-amber-50"
                        }`}
                        onClick={() => {
                            if (brushMode !== "source-over") dispatch(switchBrushMode());
                        }}
                    >
                        Brush
                    </button>

                    <button
                        className={`px-2 py-1 text-sm rounded transition 
                        ${
                            brushMode === "destination-out"
                            ? "bg-amber-400 text-black"
                            : "text-amber-100 hover:text-amber-50"
                        }`}
                        onClick={() => {
                            if (brushMode !== "destination-out") dispatch(switchBrushMode());
                        }}
                    >
                        Eraser
                    </button>
                </div>
            </div>        
        </>
    )
}