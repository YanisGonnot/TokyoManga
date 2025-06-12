export interface IReview {
    userFirstname: string ;
    userLastname: string ; 
    date? : {
        createdAt: Date;
        updatedAt: Date
    };
    message: string; 
    title: string 
}