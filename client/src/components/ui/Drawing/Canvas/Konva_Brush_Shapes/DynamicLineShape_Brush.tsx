import { Line } from "react-konva";
import type { Lines } from "../../../../../types/types";

interface Props {
    line: Lines;
    i: number;
}

export const DynamicLineShape_Brush: React.FC<Props> = ({ line, i }) => {
    //gap between paralel lines
    const offset = line.strokeWidth + 10;
    const topPoints = line.points;
    const bottomPoints: number[] = [];

    //adds points below points that user draws, 
    // in result thwo paralel lines are drawn in Line, then they lock in one path
    for (let i = topPoints.length - 2; i >= 0; i -= 2) {
      const x = topPoints[i];
      const y = topPoints[i + 1] + offset;
      bottomPoints.push(x, y);
    }

    const mergedPoints = [...topPoints, ...bottomPoints];

    return (
      <Line
        key={i}
        closed={true}
        points={mergedPoints}
        stroke={line.color}
        strokeWidth={
          line.tool === "destination-out"
          ? line.eraserWidth
          : line.strokeWidth
        }
        fill={line.color}
        tension={0.5}
        lineCap="round"
        lineJoin="round"
        globalCompositeOperation={line.tool}
        shadowBlur={line.shadowSize}
        shadowColor={line.color}
        shadowEnabled={line.hasBrushShadow}
      />
    );
};
