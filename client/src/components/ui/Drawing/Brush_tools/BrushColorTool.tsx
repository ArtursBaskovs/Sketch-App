import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import { setBrushColor } from "../../../../store/canvas/toolsSlice";
import { ColorPicker } from "./ColorPicker";


export const BrushColorTool: React.FC = () => {
    const dispatch = useDispatch();
    const brushColor = useSelector((state: RootState) => state.tools.brushColor);
    const palette = {
        black: "#000000",       
        white: "#ffffff",        
        blue400: "#60a5fa",      
        blue950: "#020617",      
        green400: "#4ade80",    
        green800: "#166534",     
        red400: "#f87171",      
        red800: "#991b1b",       
        yellow400: "#facc15",    
        fuchsia500: "#d946ef",   
    }

    return (
        <>
            <div className="BRUSH_COLORS flex flex-col mt-5 gap-5 items-center">

                <label htmlFor="BrushForm" className="flex-1 text-2xl text-highlightColor self-center">
                    Brush colors
                </label>
                <ColorPicker />
                <div className="flex flex-row flex-wrap gap-2">
                    <button 
                        className="w-5 h-5 bg-black text-transparent rounded-full flex items-center justify-center"
                        onClick={() => dispatch(setBrushColor(palette.black))}
                    >
                        1
                    </button>
                    <button 
                        className="w-5 h-5 bg-white text-transparent rounded-full flex items-center justify-center"
                        onClick={() => dispatch(setBrushColor(palette.white))}
                    >
                        1
                    </button>
                    <button 
                        className="w-5 h-5 bg-blue-400 text-transparent rounded-full flex items-center justify-center"
                        onClick={() => dispatch(setBrushColor(palette.blue400))}
                    >
                        1
                    </button>
                    <button 
                        className="w-5 h-5 bg-blue-950 text-transparent rounded-full flex items-center justify-center"
                        onClick={() => dispatch(setBrushColor(palette.blue950))}    
                    >
                        1
                    </button>
                    <button 
                        className="w-5 h-5 bg-green-400 text-transparent rounded-full flex items-center justify-center"
                        onClick={() => dispatch(setBrushColor(palette.green400))}        
                    >
                        2
                    </button>
                    <button 
                        className="w-5 h-5 bg-green-800 text-transparent rounded-full flex items-center justify-center"
                        onClick={() => dispatch(setBrushColor(palette.green800))}
                    >
                        2
                    </button>
                    <button 
                        className="w-5 h-5 bg-red-400 text-transparent rounded-full flex items-center justify-center"
                        onClick={() => dispatch(setBrushColor(palette.red400))}
                    >
                        3
                    </button>
                    <button 
                        className="w-5 h-5 bg-red-800 text-transparent rounded-full flex items-center justify-center"
                        onClick={() => dispatch(setBrushColor(palette.red800))}    
                    >
                        3
                    </button>
                    <button 
                        className="w-5 h-5 bg-yellow-400 text-transparent rounded-full flex items-center justify-center"
                        onClick={() => dispatch(setBrushColor(palette.yellow400))}        
                    >
                        4
                    </button>
                    <button 
                        className="w-5 h-5 bg-fuchsia-500 text-transparent rounded-full flex items-center justify-center"
                        onClick={() => dispatch(setBrushColor(palette.fuchsia500))}     
                    >
                        4
                    </button>
                </div>

            </div>        
        </>
    )
}