import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import { setBrushForm, switchBrushMode } from "../../../../store/canvas/toolsSlice";

export const BrushesTool: React.FC = () => {
    const brushForm = useSelector((state: RootState) => state.tools.brushForm);
    const brushMode = useSelector((state: RootState) => state.tools.brushMode);
    const dispatch = useDispatch();
    return (
        <>
            <div className="BRUSHES flex flex-col mt-5 gap-3 items-center">


                <label htmlFor="BrushForm" className="flex-1 text-2xl text-highlightColor self-center">
                    Brushes
                </label>
                <div className="flex flex-row gap-5 items-center">
                    <small className="text-amber-100 font-black">{"<"}{brushForm}{">"}</small>
                    <button onClick={() => dispatch(switchBrushMode())}>{brushMode}</button>
                </div>


                <div className="flex flex-row flex-wrap gap-2">
                    <button 
                        className="w-10 h-10 bg-amber-100 hover:bg-amber-50 cursor-pointer border-2 text-transparent rounded-full flex items-center justify-center"
                        onClick={() => dispatch(setBrushForm("round"))}
                    >1</button>
                    <button 
                        className="w-10 h-10  text-amber-100 hover:text-amber-50 cursor-pointer rounded-full flex items-center justify-center"
                        onClick={() => dispatch(setBrushForm("butt"))}
                    >||||||||</button>
                    <button 
                        className="w-10 h-10 bg-amber-100 hover:bg-amber-50 hover:border-amber-50 cursor-pointer  text-transparent flex items-center justify-center"
                        onClick={() => dispatch(setBrushForm("square"))}
                    >1</button>

                </div>

            </div>        
        </>
    )
}