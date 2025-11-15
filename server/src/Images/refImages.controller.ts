import { Router } from "express";
import { RefImageService } from "./refImages.service";

const router = Router();
const refImageService = new RefImageService();

router.post('/', async (req, res, next) => {
    try {
        const {tags, url} = req.body;

        if (!tags || !url) {
            return res.status(400).json({error: "tags and url are requered {tags: ['your tags'], url: 'your url'}"})
        }

        const result = await refImageService.createImage(tags, url);
        res.json(result);
    } catch (error) {
        console.log("Error in POST for /ref-images:", error);
        next(error);
    }
})

router.get('/', async (req, res, next) => {
    try {
        const tags = req.body;
        if (!Array.isArray(tags)) {
            return res.status(400).json({ error: "Tags must be an array" });
        }

        const result = await refImageService.getImages(tags);
        res.json(result);

    } catch (error) {
        console.log("Error in GET for /ref-images:", error);
        next(error);
    }
})

export const refImageRouter = router;