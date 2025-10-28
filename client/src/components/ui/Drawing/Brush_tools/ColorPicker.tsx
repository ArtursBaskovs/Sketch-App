import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import { setBrushColor } from "../../../../store/canvas/toolsSlice";
import { useEffect, useState } from "react";
import { colord } from "colord";

interface HSVA {
  h: number;
  s: number;
  l: number;
  a: number;
}

export const ColorPicker: React.FC = () => {
    const dispatch = useDispatch();
    const brushColor = useSelector((state: RootState) => state.tools.brushColor);

    const [hslaColor, setHslaColor] = useState<HSVA>({
        h: 100,
        s: 50,
        l: 50,
        a: 1,
    });
    const handleSaturationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const s = Number(e.target.value);
        dispatch(setBrushColor(colord(hslaColor).toHex()));
        setHslaColor((prev) => ({ ...prev, s }));
    };
    const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const l = Number(e.target.value);
        dispatch(setBrushColor(colord(hslaColor).toHex()));
        setHslaColor((prev) => ({ ...prev, l }));
    };
    useEffect(() =>{
        hslaToHEX();
    }, [brushColor])

    const hslaToHEX = () => {
        const hslaFormat = colord(brushColor).toHsl();
        setHslaColor(prev => ({ ...prev,
            h: hslaFormat.h,
            s: hslaFormat.s,
            l: hslaFormat.l,
            a: hslaFormat.a
        }))
    }
    const hexToHSLA = () => {
        
    }



    return (
        <>
            <div
                className="relative w-40 h-5 rounded-full overflow-hidden"
                style={{ backgroundColor: brushColor }}
            >
            <input
                className="absolute w-full h-full cursor-pointer opacity-0 appearance-none"
                type="color"
                value={brushColor}
                onChange={(e) => dispatch(setBrushColor(e.target.value))}
            />
            </div>

            <div className="flex flex-col gap-0.5  text-amber-100 rounded-xl w-full">
                <label className="text-sm">Saturation</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={hslaColor.s}
                    onChange={handleSaturationChange}
                    className="w-full"
                    style={{
                        accentColor: `hsla(${hslaColor.h}, ${hslaColor.s}%, ${hslaColor.l}%, ${hslaColor.a})`
                    }}
                />
                
                <label className="text-sm">Brightness</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={hslaColor.l}
                    onChange={handleBrightnessChange}
                    className="w-ful"
                    style={{
                        accentColor: `hsla(${hslaColor.h}, ${hslaColor.s}%, ${hslaColor.l}%, ${hslaColor.a})`
                    }}
                />
            </div>        
        </>
    )
}