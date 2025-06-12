import { useState } from "react";
import { IReview } from "../interfaces/review-dto";

import '../style/review.css';





function ReviewItem({userFirstname, userLastname, date, message, title } : IReview){

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const intro = ` Written by ${userFirstname} ${userLastname}`


    return ( 
        <>
            <div className="review">            
                <div className="reviewInnerWrapper">
                    <div className="reviewInfo" >
                        <div className="reviewUpperContent">
                            <div>
                                <h2> {intro} </h2>
                                {date && <h5> on {date.createdAt.getDate()} </h5>}
                                {date && <h5> on {date.updatedAt.getDate()} </h5>}
                            </div>
                        </div>
                        <h2> {title}</h2>
                        <p className={ !isOpen ? 'maxLines' : 'noMaxLines'}> {message} </p>
                    </div>
                    <div className="reviewBottomContent">
                        <p onClick={toggle}>read more</p>   
                    </div>
                    <div className="hr"></div>
                </div>
            </div>
        </>
    );
  }
  
  export default ReviewItem;
