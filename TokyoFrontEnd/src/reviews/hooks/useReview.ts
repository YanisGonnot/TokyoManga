import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react"
import { getMangaAPIReviews } from "../service/getReview";

export const useReviews = (mangaId: string) => {

    const [errorReview, setErrorReview] = useState("");
    
    //Api externe 
    const {isPending : isPendingExternal, isError : isErrorExternal, error : errorExternal, 
        data : dataReviewExternal } = useQuery({
            queryKey: ['mangaReviewExterne', mangaId],
            queryFn: () => getMangaAPIReviews(mangaId),
            placeholderData: keepPreviousData,
            enabled: !mangaId
        });

    console.log("Reviews: ", dataReviewExternal); 

    if (isErrorExternal){
        setErrorReview(`${errorExternal.name}: ${errorExternal.message}`);
    }


    return {
        errorReview,
        isErrorExternal,
        isPendingExternal,
        dataReviewExternal
    };

}