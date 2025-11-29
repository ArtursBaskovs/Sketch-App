import type { Request, Response, NextFunction } from "express";

export const apiAuth = (req: Request, res: Response, next: NextFunction) => {
    const keyFromHeader = req.headers["api-key"];

    if(!keyFromHeader) {
        return res.status(401).json({
            success: false,
            message: "Did not recieve API key"
        });
    }

    if(keyFromHeader !== process.env["API_KEY"]) {
        return res.status(403).json({
            success: false,
            message: "Recieved invalid API key"
        });
    }

    next();
}