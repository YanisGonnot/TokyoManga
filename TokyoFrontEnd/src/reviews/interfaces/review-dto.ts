import { Reactions, UserReview } from "./response-review-external-dto";

export interface InternalReviewProps {
    userFirstname: string;
    userLastname: string;
    createdAt: string;
    updatedAt: string;
    message: string;
    title: string;
    score: number;
    reactions: Reactions;
}

export interface ExternalReviewProps {
    mal_id?: number;
    url?: string;
    type?: string;
    reactions: Reactions;
    date: string;
    review: string;
    score: number;
    tags?: string[];
    is_spoiler?: boolean;
    is_preliminary?: boolean;
    chapters_read?: number | null;
    user: UserReview;
}

