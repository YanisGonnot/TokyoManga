export const checkScore = (score: number) => {
    let scorePic: string = ""
    switch (score) {
        case 0:
        case 1:
            scorePic = "😞"
            break;
        case 2:
        case 3:
            scorePic = "😒"
            break;
        case 4:
        case 5:
            scorePic = "😐"
            break;
        case 6:
        case 7:
            scorePic = "🙂"
            break;
        case 8:
        case 9:
            scorePic = "😀"
            break;
        case 10:
            scorePic = "🤩"
            break;
    }
    return scorePic;

}