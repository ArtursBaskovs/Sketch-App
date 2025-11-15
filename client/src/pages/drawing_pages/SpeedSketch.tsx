import { DrawCanva } from "../../components/ui/Drawing/Canvas/DrawCanva"
import { DrawingToolsPanel } from "../../components/ui/Drawing/Brush_tools/DrawingToolsPanel"
import { DrawingKonva } from "../../components/ui/Drawing/Canvas/DrawingKonva"


export const SpeedSketch: React.FC = () => {

    return (
        <>
        <h1>Speed Sketch</h1>
        <div className="flex flex-row z-1 justify-evenly w-full mt-10">
            <DrawingToolsPanel />
            <DrawingKonva />

        </div>

        </>
    )

}