import { useEffect, useState } from "react";

const useKeyBinds = () => {

    const handleKeyListener = (key: string, action: () => void) => {
        useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === key) {
                    action();
                }
            };

            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }, [key, action]); 
    };

    const action = (key: string, action: () => void) => {
        handleKeyListener(key, action);
    }

    return { 
        action
    };
}

export default useKeyBinds;