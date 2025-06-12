import { axiosConfig } from "../../network/axiosConfig";
import { responseGetReviews, responsePostReview } from "../interfaces/response-reviews-dto";
import { PostReview } from "../interfaces/request-review-dto";
import { data } from "react-router-dom";

export const getMangaReviews = (mangaId: string) => {
    return axiosConfig.get(`/comments/${mangaId}/comment`)
        .then((response) => response)
        .then((body) => body.data as responseGetReviews[])      
}


/*
export const postMangaReview = (post : PostReview) => {
    return axiosConfig.post(
        `/comments/${post.mangaId}/comment`,
        data: {
            mangaId: post.mangaId,
            title: post.title,
            message: post.message
        }
    )
    .then((response) => response)        
    .then((body) => body.data as responsePostReview)  
}
*/