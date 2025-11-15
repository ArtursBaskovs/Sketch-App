import { useEffect, useRef, useState, type JSX } from 'react';
import { Stage, Layer, Rect, Line} from 'react-konva';
import type { KonvaEventObject } from 'konva/lib/Node';
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import type { Lines } from '../../../../types/types';
import type { BrushType } from '../../../../types/brushTypes';
import { RoundShape_Brush } from './Konva_Brush_Shapes/RoundShape_Brush';
import { SquareShape_Brush } from './Konva_Brush_Shapes/SquareShape_Brush';
import { DynamicLineShape_Brush } from './Konva_Brush_Shapes/DynamicLineShape_Brush';
import  getCursorSvg  from "../../../../assets/cursor"
import Konva from 'konva';
import useKeyBinds from '../../../../hooks/useKeyBinds';
import { keyBinds } from '../../../../config/keyBinds';

export const DrawingKonva: React.FC = () => {
    //redux
    const brushSize = useSelector((state: RootState) => state.tools.brushSize);
    //const brushPressureMultiplier = useSelector((state: RootState) => state.tools.brushPressureMultiplier);
    const brushForm = useSelector((state: RootState) => state.tools.brushForm);
    const brushColor = useSelector((state: RootState) => state.tools.brushColor);
    const brushMode = useSelector((state: RootState) => state.tools.brushMode);
    const eraserBrushSize = useSelector((state: RootState) => state.tools.eraserBrushSize);
    const hasBrushShadow = useSelector((state: RootState) => state.tools.brushShadowEnabled);
    const brushShadowSize = useSelector((state: RootState) => state.tools.brushShadowSize);
    //
    const [lines, setLines] = useState<Lines[]>([]);
    const [undoedLines, setUndoedLines] = useState<Lines[]>([]);
    const isDrawing = useRef(false);
    const lastPressureRef = useRef<number>(1);
    const canvaContainerRef = useRef<HTMLDivElement>(null);
    const [stageSize, setStageSize] = useState<DOMRect>();

    // set keybinds
    const {
        action
    } = useKeyBinds();
    action(keyBinds.canvas.undo.key, keyBinds.canvas.undo.modifier, () => undo());
    action(keyBinds.canvas.redo.key, keyBinds.canvas.redo.modifier, () => redo());
    //action(keyBinds, () => brushHandlers.increment());
   

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
            brush: brushForm,
            points: [pos.x, pos.y, pos.x, pos.y],
            hasBrushShadow: hasBrushShadow,
            shadowSize: brushShadowSize
        }])
    }

    const handleMouseDown = (e: KonvaEventObject<PointerEvent>) => {
        if (!isDrawing) return;
        isDrawing.current = true;

        setUndoedLines([]);
        addNewLine(e);
    }
    
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
    }

    const handleMouseUp = () => {
        isDrawing.current = false;
    }

    const undo = () => {
        const lastLine = lines.at(-1);
        if (lastLine) setUndoedLines((prev) => [...prev, lastLine]);
        setLines((prev) => prev.slice(0, -1));
    }

    const redo = () => {
        const lastUndoedLine = undoedLines.at(-1);
        if(!lastUndoedLine) return;
        setLines((prev) => [...prev, lastUndoedLine]);
        setUndoedLines((prev) => prev.slice(0, -1));
    }

    //cnavas are too slow to create new path each time pressure is changed, 
    // it created overlaying points or gaps if I create new path after pressure change
    /*const isPressureChanged = (e: KonvaEventObject<PointerEvent>) => {
        if(lastPressureRef.current == null) return;

        const currentPressure = e.evt.pressure;
        const deltaPressure = currentPressure - lastPressureRef.current;
        lastPressureRef.current = currentPressure;
        
        if (Math.abs(deltaPressure) > 0.02) {
            return true;
        }
        return false;
    }    */

    //uses chosen brush shape to render in konvas Stage
    const renderKonvaBrushShape = (currentBrush: BrushType, line: Lines, i: number): JSX.Element => {
        if (currentBrush === "round") return <RoundShape_Brush line={line} i={i} />;
        if (currentBrush === "square") return <SquareShape_Brush line={line} i={i} />;
        if (currentBrush === "dynamic_line") return <DynamicLineShape_Brush line={line} i={i} />;
        return <p>Nothing to render</p>;
    };
    
    //change Stage size depending on its container size
    const syncContainerKonvaSize = () => {
        if(!canvaContainerRef) return;
        setStageSize(canvaContainerRef.current?.getBoundingClientRect());
    }
    useEffect(() => {
        syncContainerKonvaSize();
    }, [canvaContainerRef.current])




    const cursorSvg = getCursorSvg(brushSize);
    const cursorUrl = `url('data:image/svg+xml;utf8,${encodeURIComponent(cursorSvg)}')`;
    return (
        <>  
        <div 
            ref={canvaContainerRef} 
            onPointerDown={syncContainerKonvaSize} 
            className=' w-300'
            style={{
                cursor: `${cursorUrl} ${brushSize / 2} ${brushSize / 2}, auto`,
            }}          
        >
            <Stage
                width={stageSize?.width} 
                height={stageSize?.height}
                onPointerDown={handleMouseDown}
                onPointerMove={handleMouseMove}
                onPointerUp={handleMouseUp}
                onPointerLeave={handleMouseUp}
                style={{
                    touchAction: "none"
                }}
            >
                <Layer>
                    <Rect
                        listening={false}  
                        x={0}
                        y={0}
                        width={stageSize?.width}
                        height={stageSize?.height}
                        fill="#fff"
                    />
                </Layer>

                <Layer >
                    {/* <Line> is one path that connects all points. 
                    For now per one OnPointerDown i create one Line 
                    */}
                    {lines.map((line, i) => (
                        renderKonvaBrushShape(line.brush, line, i)
                    ))}
                </Layer>
            </Stage>
        </div>

        </>
    )
}
