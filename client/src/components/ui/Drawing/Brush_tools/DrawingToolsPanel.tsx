import { BrushResizeTool } from "./BrushResizeTool";
import { BrushMultiplierTool } from "./BrushMultiplierTool";
import { BrushColorTool } from "./Brush_color_tool/BrushColorTool";
import { BrushesTool } from "./BrushesTool";
import useKeyBinds from "../../../../hooks/useKeyBinds";

export const DrawingToolsPanel: React.FC = () => {


    return (
        <>
        <div className="border-amber-400 bg-amber-50/10 flex flex-col gap-10 w-90 p-8">
            <BrushResizeTool />
            <BrushColorTool />
            <BrushesTool />
        </div>
        </>
    )
}