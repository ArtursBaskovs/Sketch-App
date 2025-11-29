export interface RefImageData {
  index: number;
  tags: string[];
  url: string;
  createdAt: {} | any; 
}
export interface RefImagesAPIResponse {
  success: boolean;
  message: string;
  data: Record<string, RefImageData>;
}