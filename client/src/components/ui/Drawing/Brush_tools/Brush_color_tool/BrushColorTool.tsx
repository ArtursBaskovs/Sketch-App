import { ColorPicker } from "./ColorPicker";

export const BrushColorTool: React.FC = () => {


    return (
        <>
            <div className="BRUSH_COLORS flex flex-col mt-5 gap-5 items-center">

                <label htmlFor="BrushForm" className="flex-1 text-2xl text-highlightColor self-center">
                    Brush colors
                </label>
                <ColorPicker />


            </div>        
        </>
    )
}