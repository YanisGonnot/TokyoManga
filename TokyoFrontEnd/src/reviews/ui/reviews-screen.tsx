import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";

import '../style/review.css';
import { getMangaAPIReviews, getMangaReviews } from "../service/getReview";
import {ExternalReviewItem, InternalReviewItem} from "./review-item";


const ReviewsScreen = () => {

    const {enqueueSnackbar} = useSnackbar()
    const mangaId = useParams().id

    const { isPending: isPendingExternalReview, isError : isErrorExternalReview, 
        error : errorExternalReview, data : dataExternalReview } 
        = useQuery({
            queryKey: ['mangaExternalReview', mangaId], 
            queryFn: () => getMangaAPIReviews(mangaId!),
            placeholderData: keepPreviousData,
        })

    const { isPending : isPendingInternalReview, isError: isErrorInternalReview,
        error: errorInternalReview, data : dataInternalReview}
        = useQuery({
            queryKey: ['mangaInternalReview', mangaId], 
            queryFn: () => getMangaReviews(mangaId!),
            placeholderData: keepPreviousData,
        });
            


    return (
        <>
            <div className='reviewsWrapper'>
                <div className="messageWrapper">
                    { !dataExternalReview && !isPendingExternalReview 
                        && <h3>Sorry 😕 , we couldn't find any review for this manga </h3>  
                    }
                    { isPendingExternalReview && <h2>loading...</h2>}
                    { isErrorExternalReview && <h2> error </h2>}
                    { isErrorExternalReview && enqueueSnackbar(errorExternalReview)}
                    { dataExternalReview?.data.length === 0 && <h3> No comments on this comment's page </h3>}
                </div>
                <div className="reviewContainer">
                    { 
                        dataExternalReview?.data?.map(
                            (review) =>
                            <ExternalReviewItem 
                                key={review.mal_id}
                                reactions={review.reactions} 
                                date={review.date} 
                                review={review.review} 
                                score={review.score} 
                                user={review.user}   
                            />
                        )
                    }
                </div>
                <br></br>
                <div className="messageWrapper">
                    { !dataInternalReview && !isPendingInternalReview 
                        && <h3>Sorry 😕 , we couldn't find any review for this manga </h3>  
                    }
                    { isPendingInternalReview && <h2>loading...</h2>}
                    { isErrorInternalReview && <h2> errorInternalReview </h2>}
                    { isErrorInternalReview && enqueueSnackbar(errorInternalReview)}
                    { dataInternalReview?.length === 0 && <h3> No comments for this manga </h3>}
                </div>
                <div className="reviewContainer">
                    {
                        dataInternalReview?.map(
                                (review) =>
                                    <InternalReviewItem
                                        key={review.id}
                                        //date={createdAt: review.createdAt, updatedAt: review.updatedAt}
                                        message={review.message}
                                        title={review.title}
                                        userFirstname={review.user_firstname}
                                        userLastname={review.user_lastname}
                                    />
                        )
                    }
                </div>         
            </div>
        </>
    )
}


export default ReviewsScreen;