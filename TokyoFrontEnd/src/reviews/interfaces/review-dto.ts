import { Reactions, UserReview } from "./response-review-external-dto";

export interface InternalReviewProps {
    userFirstname: string;
    userLastname: string;
    date?: {
        createdAt: Date;
        updatedAt: Date
    };
    message: string;
    title: string
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

