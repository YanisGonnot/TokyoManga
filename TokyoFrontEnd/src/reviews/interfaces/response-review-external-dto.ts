export interface ResponseGetReviewsExternal {
  data: ReviewExternal[];
  pagination: PaginationReview;
}

export interface ReviewExternal {
  user: UserReview;
  mal_id: number;
  url: string;
  type: string;
  reactions: Reactions;
  date: string;
  review: string;
  score: number;
  tags: string[];
  is_spoiler: boolean;
  is_preliminary: boolean;
}

export interface Reactions {
  overall: number;
  nice: number;
  love_it: number;
  funny: number;
  confusing: number;
  informative: number;
  well_written: number;
  creative: number;
}

export interface PaginationReview {
  last_visible_page: number;
  has_next_page: boolean;
}


export interface UserReview {
    username: string;
    url: string;
    images: {
        jpg: {
            image_url: string
        };
        webp: {
            image_url: string
        }
    }
}