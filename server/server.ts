import express from 'express';
import { refImageRouter } from './src/Images/refImages.controller';
const app = express();
import dotenv from "dotenv";
dotenv.config();


const main = async () => {
    const PORT = process.env["PORT"] ?? 3200;
    app.use(express.json())

    app.use('/api/ref-images', refImageRouter)

    app.all('*', (req, res) => {
        res.status(404).json({message: "Not Found"});
    })

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })

}

main();