import { Line } from "react-konva";
import type { Lines } from "../../../../../types/types";


interface Props {
    line: Lines;
    i: number;
}

export const SquareShape_Brush: React.FC<Props> = ({ line, i }) => (
    <Line
        key={i}
        points={line.points}
        stroke={line.color}
        strokeWidth={
            line.tool === "destination-out"
            ? line.eraserWidth
            : line.strokeWidth
        }
        tension={0.5}
        lineCap="square"
        lineJoin="round"
        globalCompositeOperation={line.tool}
        shadowBlur={line.shadowSize}
        shadowColor={line.color}
        shadowEnabled={line.hasBrushShadow}
    />
);
