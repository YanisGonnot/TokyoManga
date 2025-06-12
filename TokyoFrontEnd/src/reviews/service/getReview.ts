import { axiosConfig } from "../../network/axiosConfig";
import { responseGetReviewsInternal, responsePostReview } from "../interfaces/response-reviews-dto";
import { PostReview } from "../interfaces/request-review-dto";
import { data } from "react-router-dom";
import axios from "axios";
import { handleRequestErrors } from "../../utils/errorHandler";
import { ResponseGetReviewsExternal } from "../interfaces/response-review-external-dto";

export const getMangaReviews = (mangaId: string) => {
    return axiosConfig.get(`/comments/${mangaId}/comment`)
        .then((response) => response)
        .then((body) => body.data as responseGetReviewsInternal[])      
}


export const getMangaAPIReviews = async (mangaId : string) => {
    const res = await axios.get(`https://api.jikan.moe/v4/manga/${mangaId}/reviews`);
    if (!res) throw await handleRequestErrors(res);

    const { data } = await res;
    return data as ResponseGetReviewsExternal;
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