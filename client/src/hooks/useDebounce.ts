import { useEffect, useCallback, useRef } from 'react';

const useDebounceOnFunction = (delay: number ) => {
    const timeoutRef = useRef<number | null>(null);

    const debouncedFunction = useCallback((functionToDebounce: () => void) => {
        //clear timeout on each call to avoid extra executions, and execute function only once
        if(timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            functionToDebounce();
        }, delay);

    }, [delay]);

    useEffect(() => {
        return () => {
            if(timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);


    return debouncedFunction;
}

export default useDebounceOnFunction;