import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import { setBrushPressureMultiplier } from "../../../../store/canvas/toolsSlice";

export const BrushMultiplierTool: React.FC = () => {
    const dispatch = useDispatch();
    const brushPressureMultiplier = useSelector((state: RootState) => state.tools.brushPressureMultiplier);
    return (
        <>
        <div className="BRUSH_PRESSURE_MULTIPLIER flex flex-col items-start gap-5
        ">
            <div className="flex flex-row w-full">
                <label htmlFor="brushPressure" className="flex-1 text-2xl text-highlightColor">
                    Pen pressure multiplier
                </label>
                <div className="flex flex-row gap-1 items-center ">
                    <button 
                        className=" text-amber-200 text-2xl hover:text-amber-50 cursor-pointer"
                        onClick={() => dispatch(setBrushPressureMultiplier(brushPressureMultiplier - 0.5))}
                    >-</button>
                    <input 
                        className=" text-center text-amber-200 w-14 hover:text-amber-50
                            [&::-webkit-outer-spin-button]:appearance-none 
                            [&::-webkit-inner-spin-button]:appearance-none 
                            [appearance:textfield]
                            focus:outline-none
                            focus:ring-0
                            text-2xl
                        "
                        onChange={(e) => dispatch(setBrushPressureMultiplier(Number(e.target.value)))}
                        value={brushPressureMultiplier}
                        type="number" 
                    />
                    <button 
                        className="text-amber-200 text-2xl hover:text-amber-50 cursor-pointer"
                        onClick={() => dispatch(setBrushPressureMultiplier(brushPressureMultiplier + 0.5))}
                    >+</button>
                </div>
            </div>
        </div>
        </>
    )
}