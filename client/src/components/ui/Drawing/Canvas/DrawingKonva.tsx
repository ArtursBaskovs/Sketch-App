import { useRef, useState } from 'react';
import { Stage, Layer, Line, Text } from 'react-konva';
import type { KonvaEventObject } from 'konva/lib/Node';
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";

interface Lines {
    tool: GlobalCompositeOperation;
    strokeWidth: number;
    eraserWidth: number;
    color: string;
    lineCap?: "butt" | "round" | "square";
    points: number[];
}  
export const DrawingKonva: React.FC = () => {
    //redux
    const brushSize = useSelector((state: RootState) => state.tools.brushSize);
    //const brushPressureMultiplier = useSelector((state: RootState) => state.tools.brushPressureMultiplier);
    const brushForm = useSelector((state: RootState) => state.tools.brushForm);
    const brushColor = useSelector((state: RootState) => state.tools.brushColor);
    const brushMode = useSelector((state: RootState) => state.tools.brushMode);
    const eraserBrushSize = useSelector((state: RootState) => state.tools.eraserBrushSize);
    //
    const [lines, setLines] = useState<Lines[]>([]);
    const isDrawing = useRef(false);
    const lastPressureRef = useRef<number>(1);

    const addNewLine  = (e: KonvaEventObject<PointerEvent>) => {
        const stage = e.target.getStage();
        if (!stage) return;
        const pos = stage.getPointerPosition();
        if (!pos) return;

        //const currentPressure = lastPressureRef.current;
        //const pressuredSize = (currentPressure + brushSize ) * (brushPressureMultiplier * 4);

        setLines([...lines, { 
            tool: brushMode, 
            strokeWidth: brushSize, 
            eraserWidth: eraserBrushSize, 
            color: brushColor, 
            lineCap: brushForm,
            points: [pos.x, pos.y, pos.x, pos.y]
        }]);
    }

    const handleMouseDown = (e: KonvaEventObject<PointerEvent>) => {
        if (!isDrawing) return;
        isDrawing.current = true;

        addNewLine(e);
    };
    


    const handleMouseMove = (e:  KonvaEventObject<PointerEvent>) => {
        // no drawing - skipping
        if(!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage(); if(!stage) return;
        const point = stage.getPointerPosition(); if(!point) return;

        
        /*if(isPressureChanged(e)) {
            console.log("new line - ");
            addNewLine(e);

            return;
        } */

        let lastLine = lines[lines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);
        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    }; 

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    //cnavas are too slow to create new path each time pressure is changed, 
    // it created overlaying points or gaps if I create new path after pressure change
    const isPressureChanged = (e: KonvaEventObject<PointerEvent>) => {
        if(lastPressureRef.current == null) return;

        const currentPressure = e.evt.pressure;
        const deltaPressure = currentPressure - lastPressureRef.current;
        lastPressureRef.current = currentPressure;
        
        if (Math.abs(deltaPressure) > 0.02) {
            return true;
        }
        return false;
    }    
    return (
        <>  
        <div>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                onPointerDown={handleMouseDown}
                onPointerMove={handleMouseMove}
                onPointerUp={handleMouseUp}
                style={{
                    touchAction: "none"
                }}
            >
                <Layer>
                    {/* <Line> is one path that connects all points. 
                    For now per one OnPointerDown i create one Line */}
                    {lines.map((line, i) => (
                        <Line 
                        key={i}
                        points={line.points}
                        stroke={line.color}
                        strokeWidth={
                            Number(line.tool === 'source-over'
                                ? line.strokeWidth
                                : line.eraserWidth)
                        }
                        tension={0.5}
                        lineCap={line.lineCap}
                        lineJoin="round"
                        globalCompositeOperation={line.tool}
                        />
                    ))}
                </Layer>
            </Stage>
        </div>

        </>
    )
}