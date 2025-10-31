import { BrushResizeTool } from "./Brush_tools/BrushResizeTool";
import { BrushMultiplierTool } from "./Brush_tools/BrushMultiplierTool";
import { BrushColorTool } from "./Brush_tools/Brush_color_tool/BrushColorTool";
import { BrushesTool } from "./Brush_tools/BrushesTool";

export const DrawingToolsPanel: React.FC = () => {

    return (
        <>
        <div className="border-amber-400 bg-amber-50/10 flex flex-col gap-10 w-90 p-8">
            <BrushResizeTool />
            <BrushMultiplierTool />
            <BrushColorTool />
            <BrushesTool />
        </div>
        </>
    )
}