import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";

interface Point {
    x: number;
    y: number;
    pressure: number;
    color: string;
    size: number;
}
export const DrawCanva: React.FC = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D>(null);
    const brushEraserSizeRef = useRef<number>(null);
    const lastPressure = useRef<number>(1);

    const [isDrawing, setIsDrawing] = useState(false);
    const lastPoint = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    //redux
    const brushSize = useSelector((state: RootState) => state.tools.brushSize);
    const brushPressureMultiplier = useSelector((state: RootState) => state.tools.brushPressureMultiplier);
    const brushForm = useSelector((state: RootState) => state.tools.brushForm);
    const brushColor = useSelector((state: RootState) => state.tools.brushColor);
    const brushMode = useSelector((state: RootState) => state.tools.brushMode);
    const eraserBrushSize = useSelector((state: RootState) => state.tools.eraserBrushSize);

    const [points, setPoints] = useState<Point[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const context = canvas.getContext("2d");
        if(!context) return;

        //canvas size and pixel ratio config
        const width = 1400;
        const height = 1000;
        const scale = window.devicePixelRatio || 1;
        canvas.width = width * scale;
        canvas.height = height * scale;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.scale(scale, scale);
        
        contextRef.current = context;

        brushModeHandler();
    }, [])

    const updateBrushSettings = () => {
        if(contextRef.current == null) return;
        contextRef.current.lineCap = brushForm;
        contextRef.current.strokeStyle = brushColor;
        contextRef.current.globalCompositeOperation = brushMode;
        brushModeHandler();
    }
    //switches brush size depending on if it is eraser or just a brush
    const brushModeHandler = () => {
        if(brushMode == "source-over") {
            brushEraserSizeRef.current = brushSize;
        } 
        if(brushMode == "destination-out") {
            brushEraserSizeRef.current = eraserBrushSize;
        }
    }



    const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
        console.log('start');
        if(contextRef.current == null) return;
        updateBrushSettings();
        const {offsetX, offsetY, pressure} = e.nativeEvent; //coordinates where user started to draw

        setPoints([{ x: offsetX, y: offsetY, pressure, color: brushColor, size: brushSize }]);

        lastPoint.current = { x: offsetX, y: offsetY }; 
        draw(e);
        
        setIsDrawing(true);
    }

    const stopDrawing = () => {
        if(contextRef.current == null) return;
        console.log(points);
        contextRef.current.closePath();
        setIsDrawing(false);
    }
    
    const drawInProcess = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if(!isDrawing) return;
        draw(e);
    }

    
    const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if(contextRef.current == null) return;
        if(brushEraserSizeRef.current == null) return;
        
        const {offsetX, offsetY, pressure} = e.nativeEvent;

        //pressure/size dynamic config
        //const lineSize = (pressure + brushSize ) * brushPressureMultiplier;
        const lineSize = (pressure + brushEraserSizeRef.current ) * (brushPressureMultiplier * 4);

        setPoints(prev => [
            ...prev,
            { x: offsetX, y: offsetY, pressure, color: brushColor, size: lineSize },
        ]);
    }

useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (points.length < 2) return;

  for (let i = 1; i < points.length; i++) {
    const p1 = points[i - 1];
    const p2 = points[i];

    const avgX = (p1.x + p2.x) / 2;
    const avgY = (p1.y + p2.y) / 2;

    const width = ((p1.pressure + p2.pressure) / 2) * p1.size;
    ctx.lineWidth = width;
    ctx.strokeStyle = p1.color;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }
}, [points]);

    
    return (
        <>
        <div className="CANVAS_CONTAINER z-1">
            <button
                className="flex items-center"
            >
            <span className="text-lg">⚙️</span>
            </button>
            <canvas
                onPointerDown={startDrawing}
                onPointerUp={stopDrawing}
                onPointerMove={drawInProcess}
                
                
                ref={canvasRef}
                style={{
                    width: "1400px",
                    height: "1000px",
                    border: "1px solid red",
                    touchAction: "none"
                }}
            />
        </div>

        </>
    )

}