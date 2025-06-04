import { NavLink } from 'react-router-dom';
import './pagination.css'


export interface PageProps {
    pageNumber: number,
    totalMangas: number,
    countMangaOnPage: number,
    setPageNumber: React.Dispatch<React.SetStateAction<number>>,
    hasNextPage: boolean,
    isPlaceholderData : boolean
}

function Page({ pageNumber, totalMangas, countMangaOnPage, setPageNumber, hasNextPage, isPlaceholderData }: PageProps) {

    const firstIdMangaOnPage = (pageNumber == 1) ? pageNumber : countMangaOnPage * (pageNumber - 1) + 1;
    const lastIdMangaOnPage = countMangaOnPage * pageNumber;
    let setPage : () => void;

    return (
        <div className="pageSection">
            <a>
                {firstIdMangaOnPage}-{lastIdMangaOnPage} sur {totalMangas}
            </a>
            <NavLink to={`/page/${pageNumber-1}`} className="movePage" 
                onClick={setPage = () => { 
                    if (hasNextPage && !isPlaceholderData) setPageNumber(pageNumber - 1); 
                }}
                aria-disabled={isPlaceholderData || !hasNextPage} 
                >
                &#10094;
            </NavLink>
            <a className='symbolText'>
                Previous Page
            </a>
            <NavLink to={`/page/${pageNumber+1}`}className="movePage" 
                onClick={setPage = () => { 
                    if (hasNextPage && !isPlaceholderData) setPageNumber(pageNumber + 1); 
                }}
                aria-disabled={isPlaceholderData || !hasNextPage} 
                >
                &#10095;
            </NavLink>
            <a className='symbolText'>
                Next Page
            </a>
        </div>
    )
}


export default Page