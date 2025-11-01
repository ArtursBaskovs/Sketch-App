import { DrawCanva } from "../../components/ui/Drawing/Canvas/DrawCanva"
import { DrawingToolsPanel } from "../../components/ui/Drawing/Brush_tools/DrawingToolsPanel"
import { DrawingCanva } from "../../components/ui/Drawing/Canvas/DrawingCanva"

export const SpeedSketch: React.FC = () => {

    return (
        <>
        <h1>Speed Sketch</h1>
        <div className="flex flex-row z-1 justify-evenly w-full">
            <DrawingToolsPanel />
            <DrawCanva />
        </div>

        </>
    )

}