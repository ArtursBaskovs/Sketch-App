import dbFirestore from '../db/firestore';
import { FieldValue } from "firebase-admin/firestore";

interface ImageData {
    index: number;
    tags: string[];
    url: string;
}
interface ImageJsonMap {
    [id: string]: ImageData;
}

export class RefImageService {
    private imagesCollection;
    private imagesCounterCollection;

    constructor() {
        this.imagesCollection = dbFirestore.collection("images");
        this.imagesCounterCollection = dbFirestore.collection("imagesCounter").doc("indexCount");
    }

    async getCurrentIndex() {
        const currentIndexDocument = await this.imagesCounterCollection.get();
        const currentIndexData = currentIndexDocument.data();

        if (!currentIndexData || currentIndexData["currentIndex"] === undefined) {
            throw new Error("Did not get current index from firestore collection (ImagesCounter)");
        }
        const currentIndex = currentIndexData["currentIndex"];
        //console.log(currentIndex);
        //updates index after i got current
        await this.imagesCounterCollection.update({
            currentIndex: FieldValue.increment(1)
        });
        return currentIndex;
    }
    
    async createImage(tags: string[], url: string) {
        const index = await this.getCurrentIndex();
        const existingUrl = await this.imagesCollection.where("url", '==', url).limit(1).get();

        if(!existingUrl.empty) {
            throw new Error("This url already exists in db.") as any;
        }

        const document = await this.imagesCollection.add({
            index,
            tags,
            url,
            createdAt: FieldValue.serverTimestamp(),
        })
        return {id: document.id, tags, url, index};
    }

    async getImages(tags: string[]) {
        const countImgsByTags = await this.imagesCollection
            .where("tags", "array-contains-any", tags)
            .count()
            .get();
        //trying to select n random record from firestore so I don`t get too much data and I need random images
        const recordCount = countImgsByTags.data().count;
        
        //finally getting those images in set range. 
        //Range is between first skipped records and remaining docs above limit 
        const imgsByTags = await this.imagesCollection
            .where("tags", "array-contains-any", tags)
            //.orderBy("index")
            //.startAfter(randomSkip)
            //.limit(documentRequestLimit)
            .get();
        let imgJson: ImageJsonMap = {};

        if(imgsByTags.empty) {
            throw new Error("No matching documents.");
        }

        imgsByTags.forEach(img => {
            imgJson[img.id] = img.data() as ImageData;
        });

        return {imgJson, recordCount}; 
    }

    async getRandomImages (tags: string[], imageCountLimit: number) {
        const imagesDataJson = await this.getImages(tags);
        const imgs: ImageJsonMap = imagesDataJson.imgJson;
        const imgObjectKeys: string[] = Object.keys(imgs);

        const randomImgsJson: ImageJsonMap = {};

        let iterationCount = 1;
        Object.values(imgs).forEach(img => {
            if(iterationCount > imageCountLimit) return;
            const randomObjectKey = imgObjectKeys[Math.floor(Math.random() * imgObjectKeys.length)];
            if(!randomObjectKey) throw new Error("Did not get random object key for: " + img);
            const randomObject = imgs[randomObjectKey];
            
            //fill json with image data, no duplicates
            if(!randomObject) throw new Error("Did not get random object for: " + img);
            if(!Object.keys(randomImgsJson).includes(randomObjectKey)) {
                randomImgsJson[randomObjectKey] = randomObject as ImageData;
                iterationCount++;
            }
        })
        return randomImgsJson;
    }

}