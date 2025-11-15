import dbFirestore from '../db/firestore';


export class RefImageService {
    private imagesCollection;

    constructor() {
        this.imagesCollection = dbFirestore.collection("images");
    }
    
    async createImage(tags: string[], url: string) {
        const existingUrl = await this.imagesCollection.where("url", '==', url).limit(1).get();

        if(existingUrl) return "This url already exists in db.";

        const document = await this.imagesCollection.add({
            tags,
            url
        })
        return {id: document.id, tags, url};
    }

    async getImages(tags: string[]) {
        const imgsByTags = await this.imagesCollection.where("tags", "array-contains-any", tags).get();
        let imgJson: Record<string, {
            tags: string[];
            url: string;
        }> = {};

        if(imgsByTags.empty) {
            return "No matching documents.";
        }

        imgsByTags.forEach(img => {
            imgJson[img.id] = img.data() as { tags: string[]; url: string };
        });

        return imgJson; 
    }
}