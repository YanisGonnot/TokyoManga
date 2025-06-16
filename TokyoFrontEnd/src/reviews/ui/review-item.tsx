import { useState } from "react";

import { InternalReviewProps, ExternalReviewProps } from "../interfaces/review-dto";
import '../style/review.css';
import { checkScore } from "../tools/score-to-emoji";





export const ExternalReviewItem = ({user, reactions, date, review, score } : ExternalReviewProps) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return ( 
        <>
            <div className="review">            
                <div className="reviewUser">
                    <img src={user.images.webp.image_url} className="reviewImg"/>
                </div>
                <div className="reviewInnerWrapper">
                    <div className="reviewInfo" >
                        <div className="reviewUpperContent">
                            <div>
                                <h2>{user.username}</h2>
                                <h5> on {date.substring(0,10)} </h5>
                            </div>
                            <div className="reviewScore">
                                <h2>score: { score } { checkScore(score) }</h2>
                            </div>
                        </div>
                        <p className={ !isOpen ? 'maxLines' : 'noMaxLines'}> {review} </p>
                    </div>
                    <div className="reviewBottomContent">
                        <p onClick={toggle}>read more</p>    
                        <div className="reviewReactions">
                            <p>💗 {reactions.love_it} </p>
                            <p>😵‍💫 {reactions.confusing} </p>
                            <p>😝 {reactions.funny} </p>
                            <p>ℹ️ {reactions.informative} </p>
                            <p>👍 {reactions.nice} </p>
                            <p>🎓 {reactions.well_written} </p>
                        </div>
                    </div>
                    <div className="hr"></div>
                </div>
            </div>
        </>
    );
}

export const InternalReviewItem = ({title, message, date, userFirstname, userLastname } : InternalReviewProps ) => {

    const intro = ` Written by ${userFirstname} ${userLastname}`;

     const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

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
