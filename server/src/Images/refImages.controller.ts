import { Router } from "express";
import { RefImageService } from "./refImages.service";

const router = Router();
const refImageService = new RefImageService();

router.post('/ref-image', async (req, res, next) => {
    try {
        const {tags, url} = req.body;

        if (!tags || !url) {
            //throw new Error("tags and url are requered {tags: ['your tags'], url: 'your url'}");
            res.status(400).json({
                success: false,
                message: "tags and url are requered {tags: ['your tags'], url: 'your url'}"
            });
        }

        const result = await refImageService.createImage(tags, url);
        res.status(200).json({
            success: true,
            message: "New image url is added to firebase",
            data: result
        });
    } catch (error) {
        next(error);
    }
})

router.get('/ref-random-images/:tags', async (req, res, next) => {
    try {
        const tags = req.params.tags;
        if (!tags) {
            //throw new Error("Tags param is required");
            res.status(400).json({
                success: false,
                message: "Tags param is required"
            });
        }
        const tagsArr = tags.split(',').map(tag => tag.trim()).filter(Boolean);
        //const result = await refImageService.getImages(tags);
        const result = await refImageService.getRandomImages(tagsArr, 6);
        res.status(200).json({
            success: true,
            message: "Got random images urls from firebase",
            data: result
        });

    } catch (error) {
        next(error);
    }
})

export const refImageRouter = router;