interface ColorPaletteProps {
    onColorSelect: (color: string) => void;
}
export const ColorPalette: React.FC<ColorPaletteProps> = ({ onColorSelect }) => {
    
    const palette = {
        black: "#000000",       
        white: "#ffffff",        
        blue400: "#60a5fa",      
        blue950: "#020617",      
        green400: "#4ade80",    
        green800: "#166534",     
        red400: "#f87171",      
        red800: "#991b1b",       
        yellow400: "#facc15",    
        fuchsia500: "#d946ef",   
    }


    return (
        <>
        <div className="flex flex-row flex-wrap gap-2">
        {Object.entries(palette).map(([pickerName, color]) => (
            <button
                key={pickerName}
                className="w-5 h-5 rounded-full border border-neutral-700"
                style={{ backgroundColor: color }}
                onClick={() => onColorSelect(color)}
            />
        ))}
        </div>
        </>
    )
}