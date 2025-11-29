import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import type { RefImageData, RefImagesAPIResponse } from "../../../../types/imageDataTypes";

export const RefImage: React.FC = () => {
    const [imagesData, setImagesData] = useState<RefImageData[]>([]);
    const BASE_URL  = "http://localhost:5000/api";

    const {
        data: images,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['ref-images', 'random'],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/ref-random-images/animal`, {
                headers: {
                    'api-key': `desctop2633008`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                const text = await response.text();
                console.error('HTTP ERROR:', response.status, text);
                throw new Error(`HTTP ${response.status}: ${text}`);
            }

            const data = await response.json() as RefImagesAPIResponse;
            console.log(data);
            return data.data;
        }
    })
    
    useEffect(() => {
        if(images) {
            const refImgArray = Object.values(images);
            setImagesData(refImgArray);
        }
    }, [images])

    if(isLoading) return <p>Loading images...</p>
    if(error) return <p>Error: {(error as Error).message}</p>
    return (
        <>
            {isLoading && <p>Loading images...</p>}
            {error && <p>Error: {(error as Error).message}</p>}
            {imagesData && imagesData.length > 0 && (
                <img src={imagesData[0].url} alt="reference image" />
            )}
        </>
    )
}