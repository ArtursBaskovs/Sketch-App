import { useEffect, useState } from "react";

const useKeyBinds = () => {

    const handleKeyListener = (key: string, modKey: string, keyboardAction: () => void) => {
        useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {

                if(modKey != '' && !e.getModifierState(modKey)) {
                    return; //if action was called with passed not empty combo key, but it was not pressed
                }
                if(e.key === key) {
                    keyboardAction();
                }
            };

            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }, [key, action]); 
    };

    const action = (key: string, modKey: string, action: () => void) => {
        handleKeyListener(key, modKey, action);
    }

    return { 
        action,
    };
}

export default useKeyBinds;