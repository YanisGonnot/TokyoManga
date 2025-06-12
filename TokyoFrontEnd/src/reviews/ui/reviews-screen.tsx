import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useParams, useLocation } from "react-router-dom";

import '../style/review.css';
import { getMangaReviews } from "../service/getReview";
import ReviewItem from "./review-item";


const ReviewsScreen = () => {

    const { enqueueSnackbar } = useSnackbar()
    const mangaId = useParams().id;

    const location = useLocation();
    const imageReview = location.state;

    const { isPending, isError, error, data } =
        useQuery({
            queryKey: ['mangaReview', mangaId],
            queryFn: () => getMangaReviews(mangaId!),
            placeholderData: keepPreviousData,
        });

    return (
        <>
            <div className='reviewsWrapper'
            /*
                style={{
                    backgroundImage: `url(${imageReview})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'auto'

                }}
            */
            >
                <div className="messageWrapper">
                    {!data && !isPending && <h3>Sorry 😕 , we couldn't find any review for this manga</h3>}
                    {isPending && <h2>loading...</h2>}
                    {isError && <h2> error </h2>}
                    {isError && enqueueSnackbar(error)}
                </div>
                
                <div className="reviewContainer">
                    {`${data?.length} Reviews`}
                    <div>
                        {
                            data?.map(
                                (review) =>
                                    <ReviewItem
                                        key={review.id}
                                        //date={createdAt: review.createdAt, updatedAt: review.updatedAt}
                                        message={review.message}
                                        title={review.title}
                                        userFirstname={review.userFirstname}
                                        userLastname={review.userLastname}
                                    />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}


export default ReviewsScreen;