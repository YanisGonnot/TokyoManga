export interface IReview {
    user: string ; 
    date : {
        createdAt: Date;
        updatedAt: Date
    };
    message: string; 
    title: string 
}