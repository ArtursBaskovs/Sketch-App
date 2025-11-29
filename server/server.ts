import express from 'express';
import { refImageRouter } from './src/Images/refImages.controller';
const app = express();
import dotenv from "dotenv";
import cors from 'cors';
import { apiAuth } from './src/middleware/apiAuth.middleware';
dotenv.config();


const main = async () => {
    const PORT = process.env["PORT"] ?? 3200;
    app.use(cors());
    app.use(apiAuth);
    
    app.use(express.json());


    //route
    app.use('/api', refImageRouter);
    //bad route
    app.all('*', (req, res) => {
        res.status(404).json({
            success: false,
            message: "Request ( "+ req +" ) Not Found"
        });
    });

    //error 
    app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.error(error);

        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Server error",
        });
    });


    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}

main();