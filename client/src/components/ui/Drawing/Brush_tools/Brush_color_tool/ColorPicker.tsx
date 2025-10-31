import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../../store/store";
import { setBrushColor } from "../../../../../store/canvas/toolsSlice";
import { useCallback, useEffect, useState } from "react";
import { colord } from "colord";

import useDebounceOnFunction from "../../../../../hooks/useDebounce";
import { ColorPalette } from "./ColorPalette";

interface HSLA {
  h: number;
  s: number;
  l: number;
  a: number;
}

export const ColorPicker: React.FC = () => {
    const dispatch = useDispatch();
    const brushColor = useSelector((state: RootState) => state.tools.brushColor);
    const [localBrushColorState, setLocalBrushColorState] = useState(brushColor);

    const [hslaColor, setHslaColor] = useState<HSLA>({
        h: 100,
        s: 50,
        l: 50,
        a: 1,
    });

    const debounceDispatch = useDebounceOnFunction(200);
    const debounceHexToHSLA = useDebounceOnFunction(200);

    const handleHSLAchange = (hslaKey: keyof HSLA) => (e:  React.ChangeEvent<HTMLInputElement>) => {
        const colorParameterValue = Number(e.target.value);

        setHslaColor(prev => {
            const newColor = {...prev, [hslaKey]: colorParameterValue};
            const newHexColor = colord(newColor).toHex()
            setLocalBrushColorState(newHexColor);
            debounceDispatch(() => dispatch(setBrushColor(newHexColor)));

            return newColor;
        });
    }

    useEffect(() =>{
        hexToHSLA(brushColor);
    }, [])


    const hexToHSLA = (HEXcolor: string) => { //i need hsla format for hsla sliders that change color value by each color parameter
        const hslaFormat = colord(HEXcolor).toHsl();
        setHslaColor(prev => ({
            ...prev,
            h: hslaFormat.h,
            s: hslaFormat.s,
            l: hslaFormat.l,
            a: hslaFormat.a
        }));
    }

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //to avoid unnecessary rerenders of other components becaouse of redux I use local state and debounce dispatch
        //I still need local state for hex color for immediate dom changes inside thos component... maybe 
        setLocalBrushColorState(e.target.value);
        debounceDispatch(() => dispatch(setBrushColor(e.target.value)));
        debounceHexToHSLA(() => hexToHSLA(e.target.value));
    }
    
    const handlePalletteColorPick = useCallback((color: string) => {
        setLocalBrushColorState(color);
        dispatch(setBrushColor(color));
        hexToHSLA(color);
    }, [dispatch, hexToHSLA]);


    return (
        <>
            <div
                className="relative w-40 h-10 rounded-full overflow-hidden"
                style={{ backgroundColor: localBrushColorState }}
            >
            <input
                className="absolute w-full h-full cursor-pointer opacity-0 appearance-none"
                type="color"
                value={localBrushColorState}
                onChange={handleColorChange}
            />
            </div>

            <div className="flex flex-col gap-0.5  text-amber-100 rounded-xl w-full">
                <label className="text-sm">Hue</label>
                <input
                    type="range"
                    min="0"
                    max="360"
                    value={hslaColor.h}
                    onChange={handleHSLAchange("h")}
                    className="w-full"
                    style={{
                        accentColor: `hsla(${hslaColor.h}, ${hslaColor.s}%, ${hslaColor.l}%, ${hslaColor.a})`
                    }}
                />
                <label className="text-sm">Saturation</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={hslaColor.s}
                    onChange={handleHSLAchange("s")}
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
                    onChange={handleHSLAchange("l")}
                    className="w-ful"
                    style={{
                        accentColor: `hsla(${hslaColor.h}, ${hslaColor.s}%, ${hslaColor.l}%, ${hslaColor.a})`
                    }}
                />
                <label className="text-sm">Opacity</label>
                <input
                    type="range"
                    min="0.01"
                    max="1"
                    step="0.01"
                    value={hslaColor.a}
                    onChange={handleHSLAchange("a")}
                    className="w-ful"
                    style={{
                        accentColor: `hsla(${hslaColor.h}, ${hslaColor.s}%, ${hslaColor.l}%, ${hslaColor.a})`
                    }}
                />
            </div>
            <ColorPalette onColorSelect={handlePalletteColorPick} /> 
        </>
    )
}