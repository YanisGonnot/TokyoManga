import { Reactions } from "./response-review-external-dto";

export interface responseGetReviewsInternal {
    id: string;
    userFirstname: string;
    userLastname: string;
    manga_id: string;
    title: string;
    message: string;  
    score: number;
    reactions: Reactions;
    createdAt: string;
    updatedAt: string;
}



export interface responsePostReview {
    
}