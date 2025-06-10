import { useState } from "react";
import { IReview } from "../interfaces/review-dto";

import '../style/review.css';





function ReviewItem({user, date, message, title } : IReview){

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen);
    }



    return ( 
        <>
            <div className="review">            
                <div className="reviewInnerWrapper">
                    <div className="reviewInfo" >
                        <div className="reviewUpperContent">
                            <div>
                                <h2>{user}</h2>
                                <h5> on {date.createdAt.getDate()} </h5>
                                <h5> on {date.updatedAt.getDate()}</h5>
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
